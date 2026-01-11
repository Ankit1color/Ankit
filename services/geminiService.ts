
import { GoogleGenAI, Type } from "@google/genai";
import { ClassificationResult, WasteCategory } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function classifyWaste(imageDataBase64: string): Promise<ClassificationResult> {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: imageDataBase64,
            },
          },
          {
            text: "Identify the object in this image and classify it for disposal. Return as a JSON object with properties: objectName, category (must be one of: 'Wet Waste', 'Dry Waste', 'E-Waste', 'Hazardous Waste'), explanation, and disposalTip.",
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          objectName: { type: Type.STRING },
          category: { type: Type.STRING },
          explanation: { type: Type.STRING },
          disposalTip: { type: Type.STRING },
        },
        required: ["objectName", "category", "explanation", "disposalTip"],
      },
    },
  });

  const response = await model;
  const result = JSON.parse(response.text || '{}');
  
  return {
    objectName: result.objectName || 'Unknown Object',
    category: (result.category as WasteCategory) || WasteCategory.UNKNOWN,
    explanation: result.explanation || 'Could not determine waste type.',
    disposalTip: result.disposalTip || 'Please check local guidelines.'
  };
}
