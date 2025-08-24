import React, { useState } from 'react';
import { CampaignSettings } from '../types';
import Icon from './Icon';

interface Props {
  onGenerate: (settings: CampaignSettings) => void;
  isLoading: boolean;
}

const EmailComposer: React.FC<Props> = ({ onGenerate, isLoading }) => {
  const [goal, setGoal] = useState<string>("Promote our new summer collection and drive sales.");
  const [tone, setTone] = useState<CampaignSettings['tone']>('Friendly & Casual');
  const [numVariations, setNumVariations] = useState<number>(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({ goal, tone, numVariations });
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 sticky top-24">
      <h2 className="text-2xl font-bold mb-4 text-white flex items-center">
        <Icon name="edit" className="mr-3 text-purple-400" />
        Compose Campaign
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="goal" className="block text-sm font-medium text-gray-300 mb-2">Campaign Goal</label>
          <textarea
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            rows={3}
            className="w-full bg-gray-900 text-gray-200 p-3 rounded-lg border-2 border-gray-700 focus:border-purple-500 focus:ring-purple-500 transition"
            placeholder="e.g., Announce new product line"
          />
        </div>
        <div>
          <label htmlFor="tone" className="block text-sm font-medium text-gray-300 mb-2">Tone of Voice</label>
          <select
            id="tone"
            value={tone}
            onChange={(e) => setTone(e.target.value as CampaignSettings['tone'])}
            className="w-full bg-gray-900 text-gray-200 p-3 rounded-lg border-2 border-gray-700 focus:border-purple-500 focus:ring-purple-500 transition"
          >
            <option>Friendly & Casual</option>
            <option>Professional & Polished</option>
            <option>Excited & Urgent</option>
            <option>Informative & Helpful</option>
          </select>
        </div>
        <div>
          <label htmlFor="variations" className="block text-sm font-medium text-gray-300 mb-2">A/B Variations per Segment</label>
          <input
            id="variations"
            type="number"
            value={numVariations}
            min="1"
            max="3"
            onChange={(e) => setNumVariations(parseInt(e.target.value))}
            className="w-full bg-gray-900 text-gray-200 p-3 rounded-lg border-2 border-gray-700 focus:border-purple-500 focus:ring-purple-500 transition"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 disabled:bg-purple-900 disabled:cursor-not-allowed disabled:text-gray-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          {isLoading ? (
            <>
              <Icon name="loader" className="animate-spin mr-2" />
              Generating...
            </>
          ) : (
            <>
              <Icon name="sparkles" className="mr-2" />
              Generate Emails
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default EmailComposer;
