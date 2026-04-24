import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    return NextResponse.json({ available: false, error: "No API key" });
  }

  try {
    const client = new Anthropic({ apiKey });
    await client.messages.create({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 10,
      messages: [{ role: "user", content: "test" }],
    });
    return NextResponse.json({ available: true });
  } catch (e) {
    console.error("Chat check failed:", e);
    return NextResponse.json({ available: false, error: String(e) });
  }
}
