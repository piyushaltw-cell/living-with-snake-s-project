
import { GoogleGenAI, Type } from "@google/genai";
import { Language } from "../translations";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const identifySnakeFromImage = async (base64Image: string, language: Language = 'en') => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `You are an expert herpetologist in the fictional region of "Freedomland". 
  Analyze this image of a snake. 
  IMPORTANT: YOU MUST PROVIDE THE RESPONSE IN THE FOLLOWING LANGUAGE: ${language}.
  
  Provide the result in JSON:
  - species: Common name (in ${language})
  - scientificName: Scientific name
  - dangerLevel: One of "Harmless", "Caution Required", "Venomous", "Highly Dangerous" (in ${language})
  - description: Short description of behavior and look (in ${language})
  - advice: How to safely coexist with this specific snake if found in a yard (in ${language}).
  If it is not a snake, return an error field in ${language}.`;

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

  return JSON.parse(response.text || '{}');
};

export const getSnakeWisdom = async (history: {role: 'user' | 'bot', text: string}[], language: Language = 'en') => {
  const model = 'gemini-3-flash-preview';
  
  const contents = history.map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.text }]
  }));

  const response = await ai.models.generateContent({
    model,
    contents: contents[0]?.role === 'model' ? contents.slice(1) : contents,
    config: {
      systemInstruction: `You are the Freedomland Snake Mentor. You are a friendly, wise herpetologist. 
      IMPORTANT: YOU MUST SPEAK AND RESPOND ONLY IN THE LANGUAGE: ${language}.
      Your mission is to educate the public about snakes, alleviate fear through knowledge, and promote peaceful coexistence. 
      Always prioritize safety. Freedomland values biodiversity.`,
    }
  });

  return response.text;
};
