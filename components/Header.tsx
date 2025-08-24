
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-20">
      <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-600 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 16v-2m0-10v2M6 12H4m16 0h-2m-10 0h2M12 18a6 6 0 100-12 6 6 0 000 12z" />
            </svg>
          </div>
          <h1 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
            Personalized Marketing Email Composer
          </h1>
        </div>
        <span className="text-xs font-medium text-purple-400 bg-purple-900/50 px-3 py-1 rounded-full">
          Powered by Gemini
        </span>
      </div>
    </header>
  );
};

export default Header;
