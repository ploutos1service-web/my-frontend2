import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
// Note: process.env.API_KEY is injected by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getVibeRecommendation = async (userQuery: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `
      You are "VibeBot", an AI assistant for "vibeondemand", a premium DJ and Band booking platform.
      Your tone is cool, professional, and nightlife-oriented.
      Help the user decide what kind of artist they need (DJ, Band, Soloist) based on their event description.
      Keep responses concise (under 100 words).
      If they ask for music types, suggest genres like House, Techno, Jazz, Funk, etc.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: userQuery,
      config: {
        systemInstruction: systemInstruction,
        thinkingConfig: { thinkingBudget: 0 }, // Minimal latency needed
      }
    });

    return response.text || "I couldn't quite catch that vibe. Try describing your event again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our AI Vibe matcher is currently recharging. Please browse our artists manually.";
  }
};