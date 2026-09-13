import { NextRequest, NextResponse } from "next/server";
import { REDBUS_KNOWLEDGE } from "../../../lib/askDevanshKnowledge";

// Ask Devansh: the AI twin on the RedBus case study. Gemini free tier, key in GEMINI_API_KEY (Vercel).
const MODEL = "gemini-2.5-flash";
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const SYSTEM = `You are Devansh Somvanshi, a product designer, answering visitors on your portfolio's RedBus case study. Speak as yourself, in the first person ("I").

How to answer:
- Short: 2 to 4 sentences. Plain, everyday words. Warm and direct. Answer first, then one reason if needed.
- No dashes (use commas or full stops), no bullet points unless asked, no jargon, no hype.
- Use only the knowledge below. Never invent numbers, quotes, dates, people or results. If the answer isn't there, say you don't have that detail here and suggest emailing devansh.think@gmail.com.
- Be honest about limits: this is a self-initiated concept, not shipped. There is no live data. Only 3 people tested it, and the fixes from testing haven't been tested again. Say so when relevant.
- People: interviewees and testers are first names only (Soumya, Vivek, Sai and others). Never name the mentor.
- If asked something unrelated to me, my work or this project, gently steer back.
- Section 1 of the knowledge is the published case study and wins over anything older.

KNOWLEDGE:
${REDBUS_KNOWLEDGE}`;

type Msg = { role: "user" | "assistant"; content: string };

export async function GET() {
  return NextResponse.json({ available: !!process.env.GEMINI_API_KEY?.trim() });
}

export async function POST(req: NextRequest) {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) return NextResponse.json({ content: "I'm offline right now. Email me at devansh.think@gmail.com." }, { status: 503 });
  try {
    const { messages } = (await req.json()) as { messages: Msg[] };
    const contents = (messages ?? []).slice(-12).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: String(m.content).slice(0, 1000) }],
    }));
    const res = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM }] },
        contents,
        generationConfig: { temperature: 0.4, maxOutputTokens: 600, thinkingConfig: { thinkingBudget: 0 } },
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(JSON.stringify(data.error ?? data));
    const text = (data.candidates?.[0]?.content?.parts ?? []).map((p: { text?: string }) => p.text ?? "").join("").trim();
    return NextResponse.json({ content: text || "Sorry, I lost my train of thought. Could you ask again?" });
  } catch (e) {
    console.error("Ask Devansh error:", e);
    return NextResponse.json({ content: "Something went wrong on my side. Please try again." }, { status: 500 });
  }
}
