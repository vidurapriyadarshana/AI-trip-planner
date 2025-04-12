import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function getJsonResponse(prompt) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      response_mime_type: "application/json",
    },
  });

  const result = await model.generateContent(prompt);
  const text = await result.response.text();

  try {
    const json = JSON.parse(text);
    return json;
  } catch (error) {
    console.error("❌ Failed to parse JSON:", text);
    return null;
  }
}
