import React from 'react';
import Icon from './Icon';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const CustomerSegmentInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-2xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-white flex items-center">
        <Icon name="users" className="mr-3 text-cyan-400" />
        Customer Segments
      </h2>
      <p className="text-sm text-gray-400 mb-4">
        Define your customer segments here in JSON format. The AI will use this data to tailor content.
      </p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-64 bg-gray-900 text-gray-300 font-mono text-xs p-4 rounded-lg border-2 border-gray-700 focus:border-cyan-500 focus:ring-cyan-500 transition-colors duration-200"
        placeholder="Enter customer data as JSON..."
        spellCheck="false"
      />
    </div>
  );
};

export default CustomerSegmentInput;
