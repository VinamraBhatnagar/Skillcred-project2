import React, { useState } from 'react';
import { EmailVariation } from '../types';
import Icon from './Icon';

interface Props {
  emails: EmailVariation[];
}

const EmailPreview: React.FC<Props> = ({ emails }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [darkMode, setDarkMode] = useState(false); // ✅ toggle state

  if (!emails || emails.length === 0) {
    return null;
  }

  const activeEmail = emails[activeTab];

  // ✅ Try decoding safely
  let decodedBody = activeEmail.body || "";
  try {
    decodedBody = decodeURIComponent(decodedBody);
  } catch (e) {
    // if not URI encoded, keep as-is
  }

  // ✅ Replace placeholders + line breaks
  decodedBody = decodedBody
    .replace(/\{dynamicDiscountCode\}/g, activeEmail.dynamicDiscountCode || "")
    .replace(/%0A/gi, "<br/>"); // convert line breaks

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 border-b border-gray-700 flex justify-between items-center px-2">
        {/* Tabs */}
        <nav className="-mb-px flex space-x-4 overflow-x-auto" aria-label="Tabs">
          {emails.map((email, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`${
                activeTab === index
                  ? 'border-purple-400 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
              } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              {email.targetSegment} - {email.variationName}
            </button>
          ))}
        </nav>

        {/* ✅ Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-4 px-3 py-1 text-xs rounded-md border border-gray-500 hover:bg-gray-700 transition-colors"
        >
          {darkMode ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>

      <div className="flex-grow mt-4 overflow-y-auto pr-2">
        <div className="bg-gray-900 p-4 rounded-lg mb-4">
          <div className="flex items-start">
            <span className="text-sm font-bold text-gray-400 w-20">Subject:</span>
            <p className="text-sm font-medium text-gray-200 flex-1">{activeEmail.subject}</p>
          </div>
          <div className="flex items-start mt-2">
            <span className="text-sm font-bold text-gray-400 w-20">Discount:</span>
            <span className="text-sm font-semibold bg-green-800 text-green-200 px-2 py-0.5 rounded-md">
              {activeEmail.dynamicDiscountCode}
            </span>
          </div>
        </div>

        {/* ✅ Preview Box */}
        <div
          className={`rounded-lg shadow-inner overflow-hidden ${
            darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
          }`}
        >
          <div
            className={`p-2 text-xs font-mono ${
              darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-600'
            }`}
          >
            Email Client Preview
          </div>
          <div
            className="p-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: decodedBody }}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailPreview;
