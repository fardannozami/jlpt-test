"use client"

import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Home } from "lucide-react"

interface ResultsPageProps {
  section: string
  answers: { [key: number]: string }
  questions: any[]
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 text-slate-900 p-4 md:p-8">
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
              return (
                <div key={index} className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-start gap-3 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 mb-2">
                        Soal {index + 1}: {q.question}
                      </p>
                      <p className="text-slate-600 text-sm mb-2">
                        <span className={isCorrect ? "text-green-600" : "text-red-600"}>{isCorrect ? "✓" : "✗"}</span>{" "}
                        Jawaban Anda: {q.options.find((opt) => opt.id === answers[index])?.text}
                      </p>
                      {!isCorrect && (
                        <p className="text-slate-600 text-sm">
                          <span className="text-green-600">✓</span> Jawaban Benar:{" "}
                          {q.options.find((opt) => opt.id === q.correctAnswer)?.text}
                        </p>
                      )}
                      {q.explanation && (
                        <p className="text-slate-500 text-sm mt-2 italic">Penjelasan: {q.explanation}</p>
                      )}
                    </div>
                  </div>
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
