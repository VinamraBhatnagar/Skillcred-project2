import React, { useState, useCallback } from 'react';
import { Customer, Product, EmailVariation, CampaignSettings } from './types';
import { generatePersonalizedEmails } from './services/geminiService';
import Header from './components/Header';
import CustomerSegmentInput from './components/CustomerSegmentInput';
import ProductCatalogInput from './components/ProductCatalogInput';
import EmailComposer from './components/EmailComposer';
import EmailPreview from './components/EmailPreview';
import Spinner from './components/Spinner';
import { initialCustomers, initialProducts } from './constants';

const App: React.FC = () => {
  const [customerData, setCustomerData] = useState<string>(JSON.stringify(initialCustomers, null, 2));
  const [productData, setProductData] = useState<string>(JSON.stringify(initialProducts, null, 2));
  const [generatedEmails, setGeneratedEmails] = useState<EmailVariation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateEmails = useCallback(async (settings: CampaignSettings) => {
    setIsLoading(true);
    setError(null);
    setGeneratedEmails([]);

    try {
      let customers: Customer[];
      let products: Product[];

      try {
        customers = JSON.parse(customerData);
      } catch (e) {
        throw new Error("Invalid JSON in Customer Segments. Please check the format.");
      }

      try {
        products = JSON.parse(productData);
      } catch (e) {
        throw new Error("Invalid JSON in Product Catalog. Please check the format.");
      }

      const emails = await generatePersonalizedEmails(customers, products, settings);
      setGeneratedEmails(emails);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [customerData, productData]);

  return (
    <div className="min-h-screen bg-gray-900 font-sans text-gray-200">
      <Header />
      <main className="container mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-4 space-y-8">
            <CustomerSegmentInput value={customerData} onChange={setCustomerData} />
            <ProductCatalogInput value={productData} onChange={setProductData} />
          </div>

          {/* Middle Column: Composer */}
          <div className="lg:col-span-3">
            <EmailComposer onGenerate={handleGenerateEmails} isLoading={isLoading} />
          </div>

          {/* Right Column: Previews */}
          <div className="lg:col-span-5">
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 h-full">
              <h2 className="text-2xl font-bold mb-4 text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Generated Emails
              </h2>
              <div className="relative h-[calc(100%-40px)]">
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-75 rounded-lg z-10">
                    <Spinner />
                    <p className="mt-4 text-lg text-gray-300">Crafting personalized content...</p>
                  </div>
                )}
                {error && (
                  <div className="absolute inset-0 flex items-center justify-center bg-red-900 bg-opacity-50 rounded-lg p-4">
                    <p className="text-center text-red-200">{error}</p>
                  </div>
                )}
                {!isLoading && !error && generatedEmails.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-center text-gray-500">
                    <p>Your generated emails will appear here.</p>
                  </div>
                )}
                {generatedEmails.length > 0 && <EmailPreview emails={generatedEmails} />}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
