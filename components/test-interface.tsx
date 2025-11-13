"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, Clock } from "lucide-react"
import { useQuestionBank } from "@/components/providers/question-provider"
import type { Question, Option } from "@/lib/questions"
import { getShuffledOptions, shuffleArray } from "@/lib/questions"
import ResultsPage from "./results-page"

interface TestInterfaceProps {
  section: string
  onBack: () => void
}

export default function TestInterface({ section, onBack }: TestInterfaceProps) {
  const { questions: questionBank, loading: bankLoading } = useQuestionBank()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [testFinished, setTestFinished] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([])

  useEffect(() => {
    if (bankLoading) return

    const sectionQuestions = questionBank.filter((q) => q.section === section)
    if (sectionQuestions.length === 0) {
      setShuffledQuestions([])
      setTimeRemaining(null)
      setCurrentQuestion(0)
      setAnswers({})
      setTestFinished(false)
      return
    }

    const randomizedSectionQuestions = shuffleArray(sectionQuestions).map((q) => ({
      ...q,
      options: getShuffledOptions(q),
    }))

    setShuffledQuestions(randomizedSectionQuestions)
    setCurrentQuestion(0)
    setAnswers({})
    setTestFinished(false)
    setTimeRemaining(randomizedSectionQuestions.length * 120)
  }, [section, questionBank, bankLoading])

  useEffect(() => {
    if (timeRemaining === null || testFinished || timeRemaining <= 0) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null) return null
        const newTime = Math.max(0, prev - 1)
        if (newTime === 0) {
          setTestFinished(true)
        }
        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [testFinished, timeRemaining])

  if (bankLoading || timeRemaining === null) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <p className="text-lg text-slate-600">
          {bankLoading ? "Memuat bank soal..." : "Menyiapkan soal untuk bagian ini..."}
        </p>
      </div>
    )
  }

  if (shuffledQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-6">
        <div className="max-w-xl w-full">
          <Card className="border-blue-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-900">Belum ada soal</CardTitle>
              <p className="text-slate-600">Tambahkan soal baru melalui dashboard admin untuk mulai berlatih.</p>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/admin">Buka Dashboard Admin</Link>
              </Button>
              <Button variant="outline" className="flex-1" onClick={onBack}>
                Kembali
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const totalQuestions = shuffledQuestions.length
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getTimerColor = () => {
    const totalTime = shuffledQuestions.length * 120
    const percentage = (timeRemaining / totalTime) * 100
    if (percentage > 50) return "text-green-600"
    if (percentage > 20) return "text-orange-600"
    return "text-red-600"
  }

  const handleAnswer = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: optionId,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setTestFinished(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const getSectionTitle = () => {
    const titles: { [key: string]: string } = {
      vocabulary: "語彙 (Vocabulary)",
      grammar: "文法 (Grammar)",
      reading: "読解 (Reading)",
      listening: "聴解 (Listening)",
    }
    return titles[section] || section
  }

  const renderPromptMedia = (question: Question) => {
    if (!question.promptMediaUrl) return null
    if (question.promptType === "image") {
      return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <img
            src={question.promptMediaUrl}
            alt={question.promptMediaAlt || "Gambar pertanyaan"}
            className="w-full max-h-[420px] object-contain rounded-lg"
            loading="lazy"
          />
        </div>
      )
    }
    if (question.promptType === "audio") {
      return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <audio controls className="w-full">
            <source src={question.promptMediaUrl} />
            Browser anda tidak mendukung pemutar audio.
          </audio>
        </div>
      )
    }
    return null
  }

  const renderOptionContent = (option: Option) => {
    const hasText = Boolean(option.text?.trim())
    const hasImage = Boolean(option.imageUrl)

    return (
      <div className="flex flex-col gap-2 text-slate-700">
        {hasText && <span className="text-base leading-relaxed">{option.text}</span>}
        {hasImage && (
          <img
            src={option.imageUrl}
            alt={option.imageAlt || "Pilihan jawaban berbentuk gambar"}
            className="max-h-48 w-full rounded-lg border border-slate-200 bg-white object-contain p-2"
            loading="lazy"
          />
        )}
        {!hasText && !hasImage && <span className="text-sm text-slate-500">Konten tidak tersedia</span>}
      </div>
    )
  }

  if (testFinished) {
    return <ResultsPage section={section} answers={answers} questions={shuffledQuestions} onRestart={onBack} />
  }

  const q = shuffledQuestions[currentQuestion]
  const selectedAnswer = answers[currentQuestion]

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50 text-slate-900 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" className="text-slate-600 hover:text-slate-900 mb-4 -ml-2" onClick={onBack}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>

          <div className="mb-4 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{getSectionTitle()}</h1>
              <p className="text-slate-500">
                Soal {currentQuestion + 1} dari {totalQuestions}
              </p>
            </div>
            <div className={`text-right p-3 bg-white rounded-lg border border-slate-200 ${getTimerColor()}`}>
              <div className="flex items-center gap-2 justify-end">
                <Clock className="w-5 h-5" />
                <div className="text-2xl font-bold font-mono">{formatTime(timeRemaining)}</div>
              </div>
              <p className="text-xs text-slate-500 mt-1">Sisa Waktu</p>
            </div>
          </div>

          <Progress value={progress} className="h-2 bg-slate-200" />
        </div>

        <Card className="bg-white border-slate-200 mb-8 shadow-sm">
          <CardHeader className="space-y-4">
            {q.question && q.question.trim().length > 0 && (
              <CardTitle className="text-slate-900 text-xl">{q.question}</CardTitle>
            )}
            {renderPromptMedia(q)}
          </CardHeader>
          <CardContent className="space-y-4">
            {q.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  selectedAnswer === option.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 bg-slate-50 hover:border-slate-300"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === option.id ? "border-blue-500 bg-blue-500" : "border-slate-300 bg-white"
                    }`}
                  >
                    {selectedAnswer === option.id && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <div className="flex-1">{renderOptionContent(option)}</div>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1 bg-slate-100 border-slate-300 hover:bg-slate-200 text-slate-900"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Sebelumnya
          </Button>
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" onClick={handleNext}>
            {currentQuestion === totalQuestions - 1 ? "Selesai" : "Lanjut"}
          </Button>
        </div>
      </div>
    </div>
  )
}
