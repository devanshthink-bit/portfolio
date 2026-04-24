import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    return NextResponse.json({ available: false, error: "No API key" });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    await model.generateContent("test");
    return NextResponse.json({ available: true });
  } catch (e) {
    console.error("Chat check failed:", e);
    return NextResponse.json({ available: false, error: String(e) });
  }
}
