import { GoogleGenAI, Type } from "@google/genai";
import type { Handler } from "@netlify/functions";

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      variationName: { type: Type.STRING },
      targetSegment: { type: Type.STRING },
      subject: { type: Type.STRING },
      dynamicDiscountCode: { type: Type.STRING },
      body: { type: Type.STRING },
    },
    required: ["variationName", "targetSegment", "subject", "dynamicDiscountCode", "body"],
  },
};

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // Debug: check env var visibility
  const apiKey = process.env.API_KEY;
  console.log("API_KEY exists?", !!apiKey);  // will print true/false in Netlify logs

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "API_KEY environment variable not set in Netlify.",
        debug: {
          allEnvKeys: Object.keys(process.env), // shows which keys Netlify passed
        },
      }),
    };
  }

  try {
    const { customers, products, settings } = JSON.parse(event.body || "{}");

    const prompt = `
    You are an expert marketing copywriter and e-commerce strategist...
    (your long prompt text here)
    `;

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
      },
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: response.text,
    };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate email content." }),
    };
  }
};
