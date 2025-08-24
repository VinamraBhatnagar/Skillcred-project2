
import React from 'react';
import Icon from './Icon';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const ProductCatalogInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-2xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-white flex items-center">
        <Icon name="tag" className="mr-3 text-green-400" />
        Product Catalog
      </h2>
      <p className="text-sm text-gray-400 mb-4">
        Provide your product catalog in JSON format. Include details the AI can use to create compelling offers.
      </p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-64 bg-gray-900 text-gray-300 font-mono text-xs p-4 rounded-lg border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 transition-colors duration-200"
        placeholder="Enter product data as JSON..."
        spellCheck="false"
      />
    </div>
  );
};

export default ProductCatalogInput;
