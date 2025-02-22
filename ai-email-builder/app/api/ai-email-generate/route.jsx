import { GoogleGenerativeAI } from "@google/generative-ai";
import Prompt from "@/Data/Prompt";

export async function POST(req) {
  const { prompt } = await req.json();

  if (!prompt) {
    return new Response(JSON.stringify({ error: "No prompt provided" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  const chatSession = model.startChat({ generationConfig });

  try {
    const fullPrompt = `${Prompt.EMAIL_PROMPT}\n\nUser input: ${prompt}`;
    const result = await chatSession.sendMessage(fullPrompt);
    const responseText = result.response.text();

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(responseText);
    } catch (parseError) {
      throw new Error(`Invalid JSON response: ${responseText}`);
    }

    return new Response(JSON.stringify(jsonResponse), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API Error:", error.message, error.stack);
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to generate email template",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
