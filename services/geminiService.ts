
import { GoogleGenAI, Type } from "@google/genai";
import { Language } from "../translations";

// Initialize the Google GenAI client with the API key from the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Identify a snake species from a base64 encoded image and provide localized details.
 */
export const identifySnakeFromImage = async (base64Image: string, language: Language = 'en') => {
  const model = 'gemini-3.1-pro-preview';
  
  const prompt = `You are a world-class herpetologist expert in snake identification.
  Analyze this image of a snake with extreme care. 
  
  Your identification must be highly accurate as misidentification can lead to dangerous situations.
  Look for specific scale patterns, head shape, eye pupils, and body morphology.
  
  IMPORTANT: YOU MUST PROVIDE THE RESPONSE IN THE FOLLOWING LANGUAGE: ${language}.
  
  Provide the result in JSON:
  - species: Common name (in ${language})
  - scientificName: Scientific name
  - dangerLevel: One of "Harmless", "Caution Required", "Venomous", "Highly Dangerous" (in ${language})
  - description: Detailed but concise description of physical features and behavior (in ${language})
  - advice: Crucial safety advice for coexisting or handling the situation if this snake is encountered (in ${language}).
  - confidence: A percentage value (0-100) representing your certainty in this identification.
  
  If the image does not contain a snake or is too blurry to identify, return an error field explaining why in ${language}.`;

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
          confidence: { type: Type.NUMBER },
          error: { type: Type.STRING }
        }
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

/**
 * Fix: Added getSnakeWisdom to handle chat-like queries about snakes in Freedomland.
 * Uses gemini-3-pro-preview for complex reasoning and knowledge retrieval.
 */
export const getSnakeWisdom = async (history: { role: 'user' | 'bot', text: string }[], language: Language = 'en') => {
  const model = 'gemini-3-pro-preview';
  
  // Convert our internal message format to the Gemini contents format.
  const contents = history.map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.text }]
  }));

  const response = await ai.models.generateContent({
    model,
    contents,
    config: {
      systemInstruction: `You are the "Freedomland Snake Mentor", a world-class herpetologist expert in the snakes of Freedomland. 
      Your goal is to educate people on how to coexist safely with snakes. 
      Be wise, patient, and scientific. If someone reports a snake bite, prioritize advising them to seek immediate medical attention at a hospital.
      Respond strictly in the following language: ${language}.`,
    }
  });

  return response.text;
};
