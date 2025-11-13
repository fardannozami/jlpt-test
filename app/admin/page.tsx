"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useQuestionBank } from "@/components/providers/question-provider"
import type { Question, QuestionPromptType, QuestionSection } from "@/lib/questions"
import { AudioLines, Image as ImageIcon, ListPlus, Plus, RefreshCw, Trash2 } from "lucide-react"

type OptionFormState = {
  id: string
  text: string
  imageUrl: string
  imageAlt: string
  answerType: "text" | "image"
}

type QuestionFormState = {
  id?: number
  section: QuestionSection
  question: string
  promptType: QuestionPromptType
  promptMediaUrl: string
  promptMediaAlt: string
  explanation: string
  options: OptionFormState[]
  correctAnswer: string
}

const sectionOptions: { value: QuestionSection; label: string }[] = [
  { value: "vocabulary", label: "語彙 (Vocabulary)" },
  { value: "grammar", label: "文法 (Grammar)" },
  { value: "reading", label: "読解 (Reading)" },
  { value: "listening", label: "聴解 (Listening)" },
]

const promptTypeOptions: { value: QuestionPromptType; label: string; helper: string }[] = [
  { value: "text", label: "Teks", helper: "Gunakan paragraf pertanyaan biasa." },
  { value: "image", label: "Gambar", helper: "Dukung URL gambar (PNG, JPG, dll)." },
  { value: "audio", label: "Audio", helper: "Dukung URL audio (MP3, WAV, dll)." },
]

const createEmptyOption = (id: string): OptionFormState => ({
  id,
  text: "",
  imageUrl: "",
  imageAlt: "",
  answerType: "text",
})

const defaultOptionIds = ["a", "b", "c", "d"]

const createDefaultFormState = (section: QuestionSection = "vocabulary"): QuestionFormState => ({
  section,
  question: "",
  promptType: "text",
  promptMediaUrl: "",
  promptMediaAlt: "",
  explanation: "",
  options: defaultOptionIds.map(createEmptyOption),
  correctAnswer: defaultOptionIds[0],
})

const getPromptIcon = (type: QuestionPromptType) => {
  switch (type) {
    case "audio":
      return <AudioLines className="h-4 w-4" />
    case "image":
      return <ImageIcon className="h-4 w-4" />
    default:
      return <ListPlus className="h-4 w-4" />
  }
}

const getNextOptionId = (options: OptionFormState[]) => {
  const existing = new Set(options.map((opt) => opt.id))
  for (let code = 97; code <= 122; code++) {
    const candidate = String.fromCharCode(code)
    if (!existing.has(candidate)) return candidate
  }
  return `opt-${Date.now()}`
}

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error ?? new Error("Gagal membaca file."))
    reader.readAsDataURL(file)
  })

export default function AdminDashboardPage() {
  const { questions, customQuestions, loading, upsertQuestion, deleteQuestion, generateQuestionId } = useQuestionBank()
  const [formState, setFormState] = useState<QuestionFormState>(createDefaultFormState())
  const [listFilter, setListFilter] = useState<QuestionSection | "all">("all")
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const filteredQuestions = useMemo(() => {
    if (listFilter === "all") return questions
    return questions.filter((q) => q.section === listFilter)
  }, [questions, listFilter])

  const isQuestionCustom = (id: number) => customQuestions.some((q) => q.id === id)

  const resetForm = (section?: QuestionSection) => {
    setFormState(createDefaultFormState(section ?? formState.section))
  }

  const updateOptionField = (index: number, field: keyof OptionFormState, value: string) => {
    setFormState((prev) => {
      const updatedOptions = prev.options.map((opt, optIndex) =>
        optIndex === index ? { ...opt, [field]: value } : opt,
      )
      const safeCorrect = updatedOptions.some((opt) => opt.id === prev.correctAnswer)
        ? prev.correctAnswer
        : updatedOptions[0]?.id || ""
      return { ...prev, options: updatedOptions, correctAnswer: safeCorrect }
    })
  }

  const handleAddOption = () => {
    setFormState((prev) => {
      const newOption: OptionFormState = createEmptyOption(getNextOptionId(prev.options))
      return { ...prev, options: [...prev.options, newOption] }
    })
  }

  const handleOptionTypeChange = (index: number, nextType: OptionFormState["answerType"]) => {
    setFormState((prev) => {
      const updatedOptions = prev.options.map((opt, optIndex) => {
        if (optIndex !== index) return opt
        if (opt.answerType === nextType) return opt
        return {
          ...opt,
          answerType: nextType,
          text: nextType === "text" ? opt.text : "",
          imageUrl: nextType === "image" ? opt.imageUrl : "",
          imageAlt: nextType === "image" ? opt.imageAlt : "",
        }
      })
      return { ...prev, options: updatedOptions }
    })
  }

  const handlePromptImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const dataUrl = await readFileAsDataUrl(file)
      setFormState((prev) => ({
        ...prev,
        promptMediaUrl: dataUrl,
        promptMediaAlt: prev.promptMediaAlt || file.name,
      }))
    } catch (error) {
      console.error("[AdminDashboard] Failed to read prompt image file", error)
      setStatusMessage({ type: "error", text: "Gagal membaca file gambar pertanyaan. Coba ulangi." })
    } finally {
      event.target.value = ""
    }
  }

  const handleOptionImageUpload = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const dataUrl = await readFileAsDataUrl(file)
      setFormState((prev) => {
        const updatedOptions = prev.options.map((opt, optIndex) => {
          if (optIndex !== index) return opt
          return {
            ...opt,
            answerType: "image",
            text: "",
            imageUrl: dataUrl,
            imageAlt: opt.imageAlt || file.name,
          }
        })
        return { ...prev, options: updatedOptions }
      })
    } catch (error) {
      console.error("[AdminDashboard] Failed to read option image file", error)
      setStatusMessage({ type: "error", text: "Gagal membaca file gambar jawaban. Coba ulangi." })
    } finally {
      event.target.value = ""
    }
  }

  const handleRemoveOption = (optionId: string) => {
    setFormState((prev) => {
      if (prev.options.length <= 2) return prev
      const remaining = prev.options.filter((opt) => opt.id !== optionId)
      const safeCorrect = remaining.some((opt) => opt.id === prev.correctAnswer)
        ? prev.correctAnswer
        : remaining[0]?.id || ""
      return { ...prev, options: remaining, correctAnswer: safeCorrect }
    })
  }

  const validateForm = (): string | null => {
    const trimmedQuestion = formState.question.trim()
    const trimmedOptions = formState.options.map((opt) => ({
      ...opt,
      text: opt.text.trim(),
      imageUrl: opt.imageUrl.trim(),
      imageAlt: opt.imageAlt.trim(),
    }))

    const filledOptions = trimmedOptions.filter((opt) =>
      opt.answerType === "text" ? opt.text.length > 0 : opt.imageUrl.length > 0,
    )
    if (filledOptions.length < 2) {
      return "Minimal ada dua opsi jawaban yang memiliki teks atau gambar."
    }

    const correctAnswerHasContent = filledOptions.some((opt) => opt.id === formState.correctAnswer)
    if (!correctAnswerHasContent) {
      return "Pilih jawaban benar yang sesuai dengan konten yang tersedia."
    }

    const incompleteImageOption = trimmedOptions.find(
      (opt) => opt.answerType === "image" && opt.imageUrl.length === 0,
    )
    if (incompleteImageOption) {
      return `Lengkapi URL gambar atau ubah tipe konten untuk opsi ${incompleteImageOption.id.toUpperCase()}.`
    }

    if (formState.promptType === "text" && trimmedQuestion.length === 0) {
      return "Pertanyaan teks tidak boleh kosong."
    }

    if (formState.promptType !== "text" && formState.promptMediaUrl.trim().length === 0) {
      return "URL media wajib diisi untuk pertanyaan gambar/audio."
    }

    const hasAnyPromptContent =
      trimmedQuestion.length > 0 || (formState.promptType !== "text" && formState.promptMediaUrl.trim().length > 0)
    if (!hasAnyPromptContent) {
      return "Isikan teks pertanyaan atau media agar soal dapat ditampilkan."
    }

    return null
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const error = validateForm()
    if (error) {
      setStatusMessage({ type: "error", text: error })
      return
    }

    const questionId = formState.id ?? generateQuestionId()
    const sanitizedOptions = formState.options.map((opt) => {
      const text = opt.text.trim()
      const imageUrl = opt.imageUrl.trim()
      const imageAlt = opt.imageAlt.trim()

      return {
        id: opt.id,
        text: opt.answerType === "text" && text.length > 0 ? text : undefined,
        imageUrl: opt.answerType === "image" && imageUrl.length > 0 ? imageUrl : undefined,
        imageAlt:
          opt.answerType === "image" && imageAlt.length > 0 ? imageAlt : undefined,
      }
    })

    const payload: Question = {
      id: questionId,
      section: formState.section,
      question: formState.question.trim(),
      options: sanitizedOptions,
      correctAnswer: formState.correctAnswer,
      explanation: formState.explanation.trim() || undefined,
      promptType: formState.promptType,
      promptMediaUrl: formState.promptType === "text" ? undefined : formState.promptMediaUrl.trim(),
      promptMediaAlt:
        formState.promptType === "image" && formState.promptMediaAlt.trim().length > 0
          ? formState.promptMediaAlt.trim()
          : undefined,
    }

    upsertQuestion(payload)
    setStatusMessage({
      type: "success",
      text: `Soal ${formState.id ? "berhasil diperbarui" : "berhasil ditambahkan"} untuk bagian ${
        sectionOptions.find((s) => s.value === formState.section)?.label ?? formState.section
      }.`,
    })
    resetForm(formState.section)
  }

  const handleEditQuestion = (question: Question) => {
    setFormState({
      id: question.id,
      section: question.section,
      question: question.question ?? "",
      promptType: question.promptType ?? "text",
      promptMediaUrl: question.promptMediaUrl ?? "",
      promptMediaAlt: question.promptMediaAlt ?? "",
      explanation: question.explanation ?? "",
      options: question.options.map((opt) => ({
        id: opt.id,
        text: opt.text ?? "",
        imageUrl: opt.imageUrl ?? "",
        imageAlt: opt.imageAlt ?? "",
        answerType: opt.imageUrl ? "image" : "text",
      })),
      correctAnswer: question.correctAnswer,
    })
  }

  const handleDeleteQuestion = (question: Question) => {
    if (typeof window !== "undefined") {
      const confirmed = window.confirm(`Hapus soal #${question.id}? Perubahan tidak dapat dibatalkan.`)
      if (!confirmed) return
    }
    deleteQuestion(question.id)
    setStatusMessage({ type: "success", text: `Soal #${question.id} telah dihapus.` })
    if (formState.id === question.id) {
      resetForm(question.section)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600 text-lg">Memuat data bank soal...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 p-4 md:p-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-blue-700">Admin Panel</p>
            <h1 className="text-3xl font-bold text-slate-900">Manajemen Bank Soal JLPT N5</h1>
            <p className="text-slate-600">
              Tambah, ubah, atau hapus soal dengan dukungan konten teks, gambar, dan audio. Data disimpan di browser
              Anda.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="outline" asChild>
              <Link href="/">Kembali ke Beranda</Link>
            </Button>
            <Button variant="ghost" onClick={() => resetForm()} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Reset Form
            </Button>
          </div>
        </header>

        {statusMessage && (
          <div
            role="status"
            className={`rounded-lg border p-4 text-sm ${
              statusMessage.type === "success"
                ? "border-green-200 bg-green-50 text-green-800"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[2fr,3fr]">
          <Card className="border-blue-100 shadow-sm">
            <CardHeader>
              <CardTitle>{formState.id ? `Edit Soal #${formState.id}` : "Tambah Soal Baru"}</CardTitle>
              <p className="text-sm text-slate-500">Semua perubahan disimpan ke penyimpanan lokal perangkat Anda.</p>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="section">Bagian Ujian</Label>
                    <Select
                      value={formState.section}
                      onValueChange={(value) =>
                        setFormState((prev) => ({ ...prev, section: value as QuestionSection }))
                      }
                    >
                      <SelectTrigger id="section">
                        <SelectValue placeholder="Pilih bagian" />
                      </SelectTrigger>
                      <SelectContent>
                        {sectionOptions.map((section) => (
                          <SelectItem key={section.value} value={section.value}>
                            {section.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="promptType">Jenis Soal</Label>
                    <Select
                      value={formState.promptType}
                      onValueChange={(value) => {
                        const promptValue = value as QuestionPromptType
                        setFormState((prev) => ({
                          ...prev,
                          promptType: promptValue,
                          promptMediaUrl: promptValue === "text" ? "" : prev.promptMediaUrl,
                          promptMediaAlt: promptValue === "image" ? prev.promptMediaAlt : "",
                        }))
                      }}
                    >
                      <SelectTrigger id="promptType">
                        <SelectValue placeholder="Pilih tipe soal" />
                      </SelectTrigger>
                      <SelectContent>
                        {promptTypeOptions.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-slate-500">
                      {promptTypeOptions.find((type) => type.value === formState.promptType)?.helper}
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="questionText">Teks Pertanyaan</Label>
                    <Textarea
                      id="questionText"
                      value={formState.question}
                      onChange={(event) => setFormState((prev) => ({ ...prev, question: event.target.value }))}
                      placeholder="Tuliskan skenario atau pertanyaan..."
                      rows={4}
                    />
                  </div>

                  {formState.promptType !== "text" && (
                    <div className="grid gap-2">
                      <Label htmlFor="mediaUrl">URL Media {formState.promptType === "audio" ? "Audio" : "Gambar"}</Label>
                      <Input
                        id="mediaUrl"
                        value={formState.promptMediaUrl}
                        onChange={(event) => setFormState((prev) => ({ ...prev, promptMediaUrl: event.target.value }))}
                        placeholder={formState.promptType === "audio" ? "https://contoh.com/audio.mp3" : "https://contoh.com/gambar.png"}
                      />
                      {formState.promptType === "image" && (
                        <>
                          <div className="grid gap-2">
                            <Label htmlFor="mediaUpload">Unggah Gambar (opsional)</Label>
                            <Input
                              id="mediaUpload"
                              type="file"
                              accept="image/*"
                              onChange={handlePromptImageUpload}
                            />
                            <p className="text-xs text-slate-500">
                              File akan dikonversi ke Data URL dan disimpan di browser Anda.
                            </p>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="mediaAlt">Deskripsi Alt Gambar</Label>
                            <Input
                              id="mediaAlt"
                              value={formState.promptMediaAlt}
                              onChange={(event) =>
                                setFormState((prev) => ({ ...prev, promptMediaAlt: event.target.value }))
                              }
                              placeholder="Contoh: Dua orang sedang berbicara"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  <div className="grid gap-2">
                    <Label htmlFor="explanation">Penjelasan (Opsional)</Label>
                    <Textarea
                      id="explanation"
                      value={formState.explanation}
                      onChange={(event) => setFormState((prev) => ({ ...prev, explanation: event.target.value }))}
                      placeholder="Tambahkan penjelasan atau tips pembahasan..."
                      rows={3}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">Pilihan Jawaban</p>
                      <p className="text-sm text-slate-500">
                        Pilih tipe konten (teks/gambar) untuk setiap opsi lalu lengkapi inputnya.
                      </p>
                    </div>
                    <Button type="button" variant="outline" size="sm" className="gap-2" onClick={handleAddOption}>
                      <Plus className="h-4 w-4" />
                      Tambah Opsi
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {formState.options.map((option, index) => (
                      <div key={option.id} className="rounded-lg border border-slate-200 p-4">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-slate-800">Opsi {option.id.toUpperCase()}</p>
                          <div className="flex items-center gap-2">
                            <Label className="flex items-center gap-2 text-sm text-slate-600">
                              <input
                                type="radio"
                                className="h-4 w-4 accent-blue-600"
                                checked={formState.correctAnswer === option.id}
                                onChange={() => setFormState((prev) => ({ ...prev, correctAnswer: option.id }))}
                              />
                              Jawaban Benar
                            </Label>
                            {formState.options.length > 2 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => handleRemoveOption(option.id)}
                                aria-label={`Hapus opsi ${option.id}`}
                              >
                                <Trash2 className="h-4 w-4 text-slate-500" />
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="mt-3 grid gap-2">
                          <Label htmlFor={`option-type-${option.id}`}>Tipe Konten Jawaban</Label>
                          <Select
                            value={option.answerType}
                            onValueChange={(value) =>
                              handleOptionTypeChange(index, value as OptionFormState["answerType"])
                            }
                          >
                            <SelectTrigger id={`option-type-${option.id}`}>
                              <SelectValue placeholder="Pilih tipe konten" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="text">Teks</SelectItem>
                              <SelectItem value="image">Gambar</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-slate-500">Tentukan apakah jawaban tampil sebagai teks atau gambar.</p>
                        </div>
                        {option.answerType === "text" ? (
                          <div className="mt-3 grid gap-2">
                            <Label>Teks Jawaban</Label>
                            <Textarea
                              value={option.text}
                              onChange={(event) => updateOptionField(index, "text", event.target.value)}
                              rows={2}
                              placeholder="Masukkan teks jawaban..."
                            />
                          </div>
                        ) : (
                          <>
                            <div className="mt-3 grid gap-2">
                              <Label>URL Gambar</Label>
                              <Input
                                value={option.imageUrl}
                                onChange={(event) => updateOptionField(index, "imageUrl", event.target.value)}
                                placeholder="https://contoh.com/gambar.png"
                              />
                            </div>
                            <div className="mt-3 grid gap-2">
                              <Label>Unggah File Gambar</Label>
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(event) => handleOptionImageUpload(index, event)}
                              />
                              <p className="text-xs text-slate-500">
                                File diubah menjadi Data URL sehingga bisa langsung digunakan pada soal.
                              </p>
                            </div>
                            <div className="mt-3 grid gap-2">
                              <Label>Deskripsi Alt Gambar</Label>
                              <Input
                                value={option.imageAlt}
                                onChange={(event) => updateOptionField(index, "imageAlt", event.target.value)}
                                placeholder="Deskripsikan gambar untuk aksesibilitas"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3 sm:flex-row">
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  {formState.id ? "Simpan Perubahan" : "Publikasikan Soal"}
                </Button>
                <Button type="button" variant="secondary" className="flex-1" onClick={() => resetForm()}>
                  Batalkan
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>Daftar Soal</CardTitle>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                  {filteredQuestions.length} soal terdaftar ({customQuestions.length} kustom).
                </p>
                <Select value={listFilter} onValueChange={(value) => setListFilter(value as QuestionSection | "all")}>
                  <SelectTrigger className="sm:w-[220px]">
                    <SelectValue placeholder="Filter bagian" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Bagian</SelectItem>
                    {sectionOptions.map((section) => (
                      <SelectItem key={section.value} value={section.value}>
                        {section.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredQuestions.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
                  Belum ada soal untuk filter ini.
                </div>
              ) : (
                filteredQuestions.map((question) => {
                  const sectionLabel = sectionOptions.find((s) => s.value === question.section)?.label || question.section
                  const promptLabel =
                    promptTypeOptions.find((type) => type.value === (question.promptType ?? "text"))?.label || "Teks"
                  const isCustom = isQuestionCustom(question.id)

                  return (
                    <div key={question.id} className="rounded-lg border border-slate-200 p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-500">#{question.id}</p>
                          <p className="text-lg font-semibold text-slate-900">
                            {question.question || "Pertanyaan berbasis media"}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Badge variant="secondary">{sectionLabel}</Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              {getPromptIcon(question.promptType ?? "text")}
                              {promptLabel}
                            </Badge>
                            <Badge variant={isCustom ? "default" : "outline"}>{isCustom ? "Kustom" : "Default"}</Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditQuestion(question)}>
                            Edit
                          </Button>
                          {isCustom && (
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteQuestion(question)}>
                              Hapus
                            </Button>
                          )}
                        </div>
                      </div>
                      {question.explanation && (
                        <p className="mt-3 text-sm text-slate-600">Penjelasan: {question.explanation}</p>
                      )}
                    </div>
                  )
                })
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
