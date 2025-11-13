"use client"

import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Home } from "lucide-react"
import type { Option, Question } from "@/lib/questions"

interface ResultsPageProps {
  section: string
  answers: { [key: number]: string }
  questions: Question[]
  onRestart: () => void
}

export default function ResultsPage({ section, answers, questions, onRestart }: ResultsPageProps) {
  const results = useMemo(() => {
    let correct = 0
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correct++
      }
    })
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
    }
  }, [answers, questions])

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
        <img
          src={question.promptMediaUrl}
          alt={question.promptMediaAlt || "Gambar pertanyaan"}
          className="mt-3 max-h-60 w-full rounded-lg border border-slate-200 object-contain p-2"
          loading="lazy"
        />
      )
    }
    if (question.promptType === "audio") {
      return (
        <audio controls className="mt-3 w-full">
          <source src={question.promptMediaUrl} />
          Browser anda tidak mendukung pemutar audio.
        </audio>
      )
    }
    return null
  }

  const renderOptionPreview = (option?: Option) => {
    if (!option) {
      return <span className="text-sm italic text-slate-500">Tidak menjawab</span>
    }

    return (
      <div className="mt-1 flex flex-col gap-2 text-sm text-slate-600">
        {option.text && <span className="text-base text-slate-700">{option.text}</span>}
        {option.imageUrl && (
          <img
            src={option.imageUrl}
            alt={option.imageAlt || "Pilihan jawaban"}
            className="max-h-32 w-full rounded-lg border border-slate-200 object-contain p-2"
            loading="lazy"
          />
        )}
        {!option.text && !option.imageUrl && <span className="text-xs text-slate-500">Tanpa konten</span>}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50 text-slate-900 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Hasil Tes</h1>
          <p className="text-slate-600">{getSectionTitle()}</p>
        </div>

        {/* Score Card */}
        <Card className="bg-white border-slate-200 mb-8 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900 text-center">Skor Anda</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-6xl font-bold text-blue-600 mb-4">
              {results.correct}/{results.total}
            </div>
            <Progress value={results.percentage} className="h-3 bg-slate-200 mb-4" />
            <p className="text-3xl font-bold text-slate-900 mb-2">{results.percentage}%</p>
            <p className="text-slate-600">
              {results.percentage >= 70 ? "✅ Selamat! Anda lulus!" : "📚 Tingkatkan kemampuan Anda!"}
            </p>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <Card className="bg-white border-slate-200 mb-8 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900">Detail Jawaban</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {questions.map((q, index) => {
              const isCorrect = answers[index] === q.correctAnswer
              const selectedOption = q.options.find((opt) => opt.id === answers[index])
              const correctOption = q.options.find((opt) => opt.id === q.correctAnswer)
              return (
                <div key={index} className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-start gap-3 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 mt-1 shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 mb-2">
                        Soal {index + 1}: {q.question || "Pertanyaan media"}
                      </p>
                      {renderPromptMedia(q)}
                    </div>
                  </div>
                  <div className="mt-3 space-y-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Jawaban Anda</p>
                      <div className={isCorrect ? "text-green-700" : "text-red-700"}>{renderOptionPreview(selectedOption)}</div>
                    </div>
                    {!isCorrect && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-green-600">Jawaban Benar</p>
                        <div className="text-green-700">{renderOptionPreview(correctOption)}</div>
                      </div>
                    )}
                  </div>
                  {q.explanation && (
                    <p className="text-slate-500 text-sm mt-2 italic">Penjelasan: {q.explanation}</p>
                  )}
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" onClick={onRestart}>
            <Home className="w-4 h-4 mr-2" />
            Kembali ke Home
          </Button>
        </div>
      </div>
    </div>
  )
}
