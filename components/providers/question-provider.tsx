"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type { Question } from "@/lib/questions"
import { questions as defaultQuestions } from "@/lib/questions"

const STORAGE_KEY = "jlpt-custom-questions"

interface QuestionContextValue {
  questions: Question[]
  customQuestions: Question[]
  loading: boolean
  upsertQuestion: (question: Question) => void
  deleteQuestion: (id: number) => void
  generateQuestionId: () => number
}

const QuestionContext = createContext<QuestionContextValue | undefined>(undefined)

export function QuestionProvider({ children }: { children: React.ReactNode }) {
  const [customQuestions, setCustomQuestions] = useState<Question[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Question[]
        setCustomQuestions(parsed)
      }
    } catch (error) {
      console.error("[QuestionProvider] Failed to parse stored questions", error)
    }
    setHydrated(true)

    let active = true
    const controller = new AbortController()

    const fetchFromFile = async () => {
      try {
        const response = await fetch("/api/custom-questions", {
          cache: "no-store",
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`Failed to fetch custom questions: ${response.status}`)
        }
        const data = (await response.json()) as Question[]
        if (active) {
          setCustomQuestions(data)
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        }
      } catch (error) {
        if ((error as Error)?.name === "AbortError") return
        console.error("[QuestionProvider] Failed to fetch stored questions from file", error)
      }
    }

    fetchFromFile()

    return () => {
      active = false
      controller.abort()
    }
  }, [])

  const syncQuestionsToFile = useCallback(async (questions: Question[]) => {
    try {
      await fetch("/api/custom-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questions }),
      })
    } catch (error) {
      console.error("[QuestionProvider] Failed to sync questions to file", error)
    }
  }, [])

  const persist = useCallback(
    (updater: (prev: Question[]) => Question[]) => {
      setCustomQuestions((prev) => {
        const next = updater(prev)
        if (typeof window !== "undefined") {
          try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
          } catch (error) {
            console.error("[QuestionProvider] Failed to store questions locally", error)
          }
        }
        void syncQuestionsToFile(next)
        return next
      })
    },
    [syncQuestionsToFile],
  )

  const upsertQuestion = useCallback(
    (question: Question) => {
      persist((prev) => {
        const exists = prev.some((q) => q.id === question.id)
        return exists ? prev.map((q) => (q.id === question.id ? question : q)) : [...prev, question]
      })
    },
    [persist],
  )

  const deleteQuestion = useCallback(
    (id: number) => {
      persist((prev) => prev.filter((q) => q.id !== id))
    },
    [persist],
  )

  const questionsValue = useMemo(() => {
    const merged = new Map<number, Question>()
    defaultQuestions.forEach((q) => merged.set(q.id, q))
    customQuestions.forEach((q) => merged.set(q.id, q))
    return Array.from(merged.values()).sort((a, b) => a.id - b.id)
  }, [customQuestions])

  const generateQuestionId = useCallback(() => {
    const maxBase = defaultQuestions.reduce((max, q) => Math.max(max, q.id), 0)
    const maxCustom = customQuestions.reduce((max, q) => Math.max(max, q.id), 0)
    return Math.max(maxBase, maxCustom) + 1
  }, [customQuestions])

  const value = useMemo(
    () => ({
      questions: questionsValue,
      customQuestions,
      loading: !hydrated,
      upsertQuestion,
      deleteQuestion,
      generateQuestionId,
    }),
    [questionsValue, customQuestions, hydrated, upsertQuestion, deleteQuestion, generateQuestionId],
  )

  return <QuestionContext.Provider value={value}>{children}</QuestionContext.Provider>
}

export function useQuestionBank() {
  const context = useContext(QuestionContext)
  if (!context) {
    throw new Error("useQuestionBank must be used within QuestionProvider")
  }
  return context
}
