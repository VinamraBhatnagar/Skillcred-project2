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
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "API_KEY environment variable not set in Netlify." }) };
  }

  try {
    const { customers, products, settings } = JSON.parse(event.body || '{}');

    const prompt = `
    You are an expert marketing copywriter and e-commerce strategist. Your task is to generate personalized marketing email campaigns.
    **Campaign Goal:** ${settings.goal}
    **Tone of Voice:** ${settings.tone}
    **Number of A/B Test Variations Per Segment:** ${settings.numVariations}
    **Input Data:**
    1.  **Customer Segments:** \`\`\`json ${JSON.stringify(customers, null, 2)} \`\`\`
    2.  **Product Catalog:** \`\`\`json ${JSON.stringify(products, null, 2)} \`\`\`
    **Your Task:**
    Based on the campaign goal and the provided data, craft tailored email content for EACH customer segment. For each segment, create ${settings.numVariations} different A/B test variations.
    **Requirements for the email body:**
    - Generate complete, well-formatted, mobile-responsive HTML with inline CSS.
    - Personalize the content for the segment.
    - Feature relevant products (image, name, price).
    - Use placeholder \`{{name}}\` for the customer's name.
    - Create a dynamic, segment-specific discount code.
    - Include a clear call-to-action button.
    Generate the response in the specified JSON format.
    `;
    
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
            temperature: 0.8,
        }
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: response.text,
    };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to generate email content." }) };
  }
};
