import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    return NextResponse.json({ available: false, error: "No API key" });
  }

  try {
    const client = new OpenAI({ apiKey });
    await client.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 10,
      messages: [{ role: "user", content: "test" }],
    });
    return NextResponse.json({ available: true });
  } catch (e) {
    console.error("Chat check failed:", e);
    return NextResponse.json({ available: false, error: String(e) });
  }
}
