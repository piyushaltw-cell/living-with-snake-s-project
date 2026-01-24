
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the GoogleGenAI client following the required { apiKey: string } structure.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Uses a multimodal model to identify a snake species and provide safety advice.
 */
export const identifySnakeFromImage = async (base64Image: string) => {
  // Use gemini-3-flash-preview for vision and identification tasks.
  const model = 'gemini-3-flash-preview';
  
  const prompt = `You are an expert herpetologist in the fictional region of "Freedomland". 
  Analyze this image of a snake. If it is a snake, provide the following in JSON:
  - species: Common name
  - scientificName: Scientific name
  - dangerLevel: One of "Harmless", "Caution Required", "Venomous", "Highly Dangerous"
  - description: Short description of behavior and look
  - advice: How to safely coexist with this specific snake if found in a yard.
  If it is not a snake, return an error field.`;

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          species: { type: Type.STRING },
          scientificName: { type: Type.STRING },
          dangerLevel: { type: Type.STRING },
          description: { type: Type.STRING },
          advice: { type: Type.STRING },
          error: { type: Type.STRING }
        }
      }
    }
  });

  // Access the text directly via the .text property.
  return JSON.parse(response.text || '{}');
};

/**
 * Provides expert snake wisdom and answers questions using a chat interface.
 * Fixed the missing export error in SnakeWisdom.tsx.
 */
export const getSnakeWisdom = async (history: {role: 'user' | 'bot', text: string}[]) => {
  // Use gemini-3-flash-preview for conversational educational tasks.
  const model = 'gemini-3-flash-preview';
  
  // Convert component history format to API contents format.
  // Note: Gemini API uses 'user' and 'model' as roles.
  const contents = history.map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.text }]
  }));

  const response = await ai.models.generateContent({
    model,
    // The Gemini API usually expects the conversation to start with a 'user' role.
    // If the history provided by the component starts with a bot greeting, 
    // we omit it for the API request as the persona is already defined in systemInstruction.
    contents: contents[0]?.role === 'model' ? contents.slice(1) : contents,
    config: {
      systemInstruction: "You are the Freedomland Snake Mentor. You are a friendly, wise herpetologist. Your mission is to educate the public about snakes, alleviate fear through knowledge, and promote peaceful coexistence. You speak warmly and use analogies when appropriate. Always prioritize human and animal safety. Freedomland is a fictional region that values biodiversity.",
    }
  });

  // Return the extracted text output.
  return response.text;
};
