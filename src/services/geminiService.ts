import { Customer, Product, EmailVariation, CampaignSettings } from '../types';

export const generatePersonalizedEmails = async (
    customers: Customer[],
    products: Product[],
    settings: CampaignSettings
): Promise<EmailVariation[]> => {
    try {
        const response = await fetch('/.netlify/functions/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ customers, products, settings }),
        });

        if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.error || `Request failed with status: ${response.status}`);
        }

        const generatedContent = await response.json() as EmailVariation[];
        return generatedContent;

    } catch (error) {
        console.error("Error fetching from Netlify function:", error);
        if (error instanceof Error) {
          throw new Error(`Failed to generate emails: ${error.message}`);
        }
        throw new Error("An unknown error occurred while trying to generate emails.");
    }
};
