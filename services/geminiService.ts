
import { GoogleGenAI, Type } from "@google/genai";
import { Customer, Product, EmailVariation, CampaignSettings } from '../types';

if (!process.env.API_KEY) {
    // In a real app, you'd want to handle this more gracefully.
    // For this example, we'll throw an error if the key is missing.
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        variationName: {
          type: Type.STRING,
          description: "The name of the variation, e.g. 'Variation A' or 'Variation B'."
        },
        targetSegment: {
          type: Type.STRING,
          description: "The specific customer segment this email is tailored for."
        },
        subject: {
          type: Type.STRING,
          description: "A compelling and personalized subject line for the email."
        },
        dynamicDiscountCode: {
          type: Type.STRING,
          description: "A unique, dynamically generated discount code for the customer, like 'WELCOME15' or 'VIP25'."
        },
        body: {
          type: Type.STRING,
          description: "The full HTML body of the email. It should be visually appealing, well-formatted, and include placeholders for customer name like {{name}}. It should strategically feature products from the catalog relevant to the customer segment and campaign goal. Include product images, names, descriptions, and prices. The HTML should use inline CSS for maximum email client compatibility and be mobile-responsive."
        },
      },
      required: ["variationName", "targetSegment", "subject", "dynamicDiscountCode", "body"],
    },
};

export const generatePersonalizedEmails = async (
    customers: Customer[],
    products: Product[],
    settings: CampaignSettings
): Promise<EmailVariation[]> => {

    const prompt = `
    You are an expert marketing copywriter and e-commerce strategist. Your task is to generate personalized marketing email campaigns.

    **Campaign Goal:** ${settings.goal}
    **Tone of Voice:** ${settings.tone}
    **Number of A/B Test Variations Per Segment:** ${settings.numVariations}

    **Input Data:**

    1.  **Customer Segments:**
        \`\`\`json
        ${JSON.stringify(customers, null, 2)}
        \`\`\`

    2.  **Product Catalog:**
        \`\`\`json
        ${JSON.stringify(products, null, 2)}
        \`\`\`

    **Your Task:**

    Based on the campaign goal and the provided data, craft tailored email content for EACH customer segment. For each segment, create ${settings.numVariations} different A/B test variations of the subject line and body copy.

    **Requirements for the email body:**
    -   Generate complete, well-formatted, and visually appealing HTML. Use inline CSS for styling.
    -   The HTML must be mobile-responsive.
    -   Personalize the content using the customer segment's characteristics (e.g., interests, purchase history).
    -   Feature relevant products from the catalog. Include product image, name, and price.
    -   Use a placeholder \`{{name}}\` where the customer's name should be.
    -   Create a dynamic, segment-specific discount code (e.g., VIP25, NEW15, COMEBACK10).
    -   Ensure the tone is consistent with the campaign settings.
    -   Include a clear call-to-action button.

    Generate the response in the specified JSON format.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.8,
            }
        });
        
        const jsonText = response.text.trim();
        const generatedContent = JSON.parse(jsonText) as EmailVariation[];

        return generatedContent;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate email content. The AI model may be overloaded or the request was invalid.");
    }
};
