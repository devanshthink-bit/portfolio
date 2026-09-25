import { NextRequest, NextResponse } from "next/server";
import { REDBUS_KNOWLEDGE } from "../../../lib/askDevanshKnowledge";
import { SIDEDOOR_KNOWLEDGE } from "../../../lib/askDevanshSidedoorKnowledge";

// Ask Devansh: the AI twin on the RedBus and SideDoor case studies. Gemini free tier, key in GEMINI_API_KEY (Vercel).
const API = "https://generativelanguage.googleapis.com/v1beta";

// Best first, free-tier models only (Google's pricing page, 13 Sep 2026). Each failure falls to the next.
// gemini-2.5-flash was closed to new keys that day, which is why this list exists.
// If every one of these is retired, the route asks Google which Flash models are live and tries those.
const MODELS = ["gemini-3.8-flash", "gemini-3.7-flash", "gemini-3.6-flash", "gemini-3.5-flash", "gemini-3.5-flash-lite"];

// Newest version first; at the same version, full Flash before Flash-Lite.
const rank = (m: string) => parseFloat(m.match(/(\d+(?:\.\d+)?)/)?.[1] ?? "0") * 10 - (/lite/.test(m) ? 1 : 0);

const REDBUS = `You are Devansh Somvanshi, a product designer, answering visitors on your portfolio's RedBus case study. Speak as yourself, in the first person ("I").

How to answer:
- Short: 2 to 4 sentences. Plain, everyday words. Warm and direct. Answer first, then one reason if needed.
- No dashes (use commas or full stops), no bullet points unless asked, no jargon, no hype.
- Use only the knowledge below. Never invent numbers, quotes, dates, people or results. If the answer isn't there, say you don't have that detail here and suggest emailing devansh.think@gmail.com.
- This is a self-initiated concept about capturing the return trip at checkout. It isn't shipped, so there is no live data; say so if asked about results.
- Never bring up, on your own: how many people tested it, testing sessions that didn't run, or that fixes haven't been re-tested. Talk about what testing showed and what changed because of it. Only if a visitor asks about exactly one of those points, answer it truthfully and briefly.
- People: interviewees and testers are first names only (Soumya, Vivek, Sai and others). Never name the mentor.
- If asked something unrelated to me, my work or this project, gently steer back.
- Section 1 of the knowledge is the published case study and wins over anything older.

KNOWLEDGE:
${REDBUS_KNOWLEDGE}`;

const SIDEDOOR = `You are Devansh Somvanshi, a product designer, answering visitors on your portfolio's SideDoor case study. Speak as yourself, in the first person ("I").

How to answer:
- Short: 2 to 4 sentences. Plain, everyday words. Warm and direct. Answer first, then one reason if needed.
- No dashes (use commas or full stops), no bullet points unless asked, no jargon, no hype.
- Use only the knowledge below. Never invent numbers, quotes, dates, people or results. If the answer isn't there, say you don't have that detail here and suggest emailing devansh.think@gmail.com.
- SideDoor is a self-initiated concept app for job referrals, designed from both sides: the candidate who asks and the referrer who refers. It isn't shipped and nobody has used it yet, so there are no results; say so if asked.
- Timeline: SideDoor was a 6-week project. Say only "6 weeks"; never give months or dates for when it ran. Dates in the notes below are when notes were written up, not project dates.
- Research: I interviewed two people, Samarth and Riya, each once as a candidate and once as a referrer. Talk about it only that way. Never say or suggest there were other interviews, and never mention AI-written research.
- Market numbers such as hire rates are not on the page because the sources weren't kept; don't give any.
- People: first names only. Never name the mentor.
- If asked something unrelated to me, my work or this project, gently steer back.
- Section 1 of the knowledge is the published case study and wins over anything older.

KNOWLEDGE:
${SIDEDOOR_KNOWLEDGE}`;

type Msg = { role: "user" | "assistant"; content: string };
type Attempt = { ok: true; text: string } | { ok: false; status: number; error: string };

async function ask(model: string, key: string, contents: unknown, system: string): Promise<Attempt> {
  const res = await fetch(`${API}/models/${model}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: system }] },
      contents,
      generationConfig: { temperature: 0.4, maxOutputTokens: 2048 },
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return { ok: false, status: res.status, error: `${model}: ${JSON.stringify(data.error ?? data).slice(0, 200)}` };
  const text = (data.candidates?.[0]?.content?.parts ?? []).map((p: { text?: string }) => p.text ?? "").join("").trim();
  return text ? { ok: true, text } : { ok: false, status: 502, error: `${model}: empty answer` };
}

// Live Flash models on this key, newest first, for when the whole list above is gone.
async function liveFlashModels(key: string): Promise<string[]> {
  const res = await fetch(`${API}/models?pageSize=200`, { headers: { "x-goog-api-key": key } });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.models ?? [])
    .filter((m: { name: string; supportedGenerationMethods?: string[] }) =>
      /flash/.test(m.name) && !/image|tts|audio|live|embed|preview|exp/.test(m.name) &&
      m.supportedGenerationMethods?.includes("generateContent"))
    .map((m: { name: string }) => m.name.replace(/^models\//, ""))
    .sort((a: string, b: string) => rank(b) - rank(a));
}

export async function GET() {
  return NextResponse.json({ available: !!process.env.GEMINI_API_KEY?.trim() });
}

export async function POST(req: NextRequest) {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) return NextResponse.json({ content: "I'm offline right now. Email me at devansh.think@gmail.com." }, { status: 503 });
  const errors: string[] = [];
  try {
    const { messages, study } = (await req.json()) as { messages: Msg[]; study?: string };
    const system = study === "sidedoor" ? SIDEDOOR : REDBUS;
    const contents = (messages ?? []).slice(-12).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: String(m.content).slice(0, 1000) }],
    }));

    const tried = new Set<string>();
    let used = "";
    const tryAll = async (models: string[]) => {
      for (const model of models) {
        if (tried.has(model)) continue;
        tried.add(model);
        const r = await ask(model, key, contents, system);
        if (r.ok) { used = model; return r.text; }
        errors.push(r.error);
        // A bad key or a bad request fails the same way on every model, so stop there.
        if (r.status === 400 || r.status === 401 || r.status === 403) return null;
      }
      return null;
    };

    const text = (await tryAll(MODELS)) ?? (await tryAll(await liveFlashModels(key)));
    // `model` says which model answered, so the fallback order can be checked from outside.
    if (text) return NextResponse.json({ content: text, model: used });
    throw new Error(errors.join(" | "));
  } catch (e) {
    console.error("Ask Devansh error:", e);
    // `detail` carries Google's error messages (never the key) so a failed call can be diagnosed.
    return NextResponse.json({ content: "Something went wrong on my side. Please try again.", detail: String(e).slice(0, 800) }, { status: 500 });
  }
}
