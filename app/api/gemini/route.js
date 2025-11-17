import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { message } = await req.json();
    if (!message) return new Response("Message required", { status: 400 });

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log(genAI)
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    console.log(model)

    const result = await model.generateContent(message);
    const reply = result.response.text();

    return Response.json({ reply });
  } catch (error) {
    console.error("Gemini Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
