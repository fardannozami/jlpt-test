import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import type { Question } from "@/lib/questions"

const DATA_DIR = path.join(process.cwd(), "data")
const DATA_FILE = path.join(DATA_DIR, "custom-questions.json")

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
    await fs.writeFile(DATA_FILE, "[]", "utf-8")
  }
}

async function readQuestionsFromFile(): Promise<Question[]> {
  await ensureDataFile()
  const raw = await fs.readFile(DATA_FILE, "utf-8")
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      return parsed as Question[]
    }
    return []
  } catch (error) {
    console.error("[custom-questions] Failed to parse JSON file.", error)
    return []
  }
}

async function writeQuestionsToFile(questions: Question[]) {
  await ensureDataFile()
  await fs.writeFile(DATA_FILE, JSON.stringify(questions, null, 2), "utf-8")
}

export const dynamic = "force-dynamic"

export async function GET() {
  const questions = await readQuestionsFromFile()
  return NextResponse.json(questions)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (!Array.isArray(body?.questions)) {
      return NextResponse.json({ error: "Payload harus berupa array questions." }, { status: 400 })
    }

    const questions = body.questions as Question[]
    await writeQuestionsToFile(questions)
    return NextResponse.json({ success: true, count: questions.length })
  } catch (error) {
    console.error("[custom-questions] Failed to write questions.", error)
    return NextResponse.json({ error: "Gagal menyimpan data soal." }, { status: 500 })
  }
}
