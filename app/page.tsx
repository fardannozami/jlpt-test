"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Volume2, PenTool, FileText } from "lucide-react"
import TestInterface from "@/components/test-interface"

export default function HomePage() {
  const [testStarted, setTestStarted] = useState(false)
  const [selectedSection, setSelectedSection] = useState<string | null>(null)

  if (testStarted && selectedSection) {
    return (
      <TestInterface
        section={selectedSection}
        onBack={() => {
          setTestStarted(false)
          setSelectedSection(null)
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 text-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-pretty">JLPT N5 Practice Test</h1>
          <p className="text-lg text-slate-600 text-balance">
            日本語能力試験 N5 - Persiapkan diri Anda untuk ujian JLPT Level N5
          </p>
        </div>

        {/* Test Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Vocabulary Section */}
          <Card
            className="bg-white border-blue-200 hover:border-blue-500 transition-colors cursor-pointer shadow-sm hover:shadow-md"
            onClick={() => {
              setSelectedSection("vocabulary")
              setTestStarted(true)
            }}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-slate-900">語彙 (Vocabulary)</CardTitle>
                  <CardDescription className="text-slate-500">単語の意味を学ぶ</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">15 Soal</p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Mulai Tes</Button>
            </CardContent>
          </Card>

          {/* Grammar Section */}
          <Card
            className="bg-white border-purple-200 hover:border-purple-500 transition-colors cursor-pointer shadow-sm hover:shadow-md"
            onClick={() => {
              setSelectedSection("grammar")
              setTestStarted(true)
            }}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <PenTool className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-slate-900">文法 (Grammar)</CardTitle>
                  <CardDescription className="text-slate-500">文の構造を理解する</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">15 Soal</p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Mulai Tes</Button>
            </CardContent>
          </Card>

          {/* Reading Section */}
          <Card
            className="bg-white border-green-200 hover:border-green-500 transition-colors cursor-pointer shadow-sm hover:shadow-md"
            onClick={() => {
              setSelectedSection("reading")
              setTestStarted(true)
            }}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-slate-900">読解 (Reading)</CardTitle>
                  <CardDescription className="text-slate-500">文章を読んで理解する</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">10 Soal</p>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Mulai Tes</Button>
            </CardContent>
          </Card>

          {/* Listening Section */}
          <Card
            className="bg-white border-orange-200 hover:border-orange-500 transition-colors cursor-pointer shadow-sm hover:shadow-md"
            onClick={() => {
              setSelectedSection("listening")
              setTestStarted(true)
            }}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <Volume2 className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-slate-900">聴解 (Listening)</CardTitle>
                  <CardDescription className="text-slate-500">音声を聞いて理解する</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">10 Soal</p>
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">Mulai Tes</Button>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900">Tentang JLPT N5</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-600 space-y-2">
            <p>• Level N5 adalah tingkat paling dasar dalam JLPT</p>
            <p>• Membutuhkan pengetahuan sekitar 100 kanji dan 800 kosakata</p>
            <p>• Ujian terdiri dari 4 bagian: Vocabulary, Grammar, Reading, dan Listening</p>
            <p>• Total waktu ujian adalah 2 jam 25 menit</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
