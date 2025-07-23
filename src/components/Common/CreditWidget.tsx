import React from 'react';
import { Zap } from 'lucide-react';

interface CreditWidgetProps {
  credits: number;
  onRefill?: () => void;
  description?: string;
  mode?: 'icon' | 'full';
  onClick?: () => void;
  iconButtonRef?: React.Ref<HTMLButtonElement>;
}

const CreditWidget: React.FC<CreditWidgetProps> = ({ credits, onRefill, description, mode = 'full', onClick, iconButtonRef }) => {
  if (mode === 'icon') {
    return (
      <button
        ref={iconButtonRef}
        className="relative flex items-center justify-center w-12 h-12 rounded-full border-4 border-amber-400 bg-white shadow hover:shadow-md transition cursor-pointer focus:outline-none"
        title="View credits"
        onClick={onClick}
        style={{ minWidth: 48, minHeight: 48 }}
      >
        <span className="text-lg font-bold text-amber-500 select-none">{credits}</span>
      </button>
    );
  }
  return (
    <div className="flex items-center bg-white rounded-2xl shadow-xl px-7 py-6 min-w-[340px] max-w-[400px] border border-gray-100">
      {/* Integrated Credit Circle */}
      <div className="flex items-center justify-center w-20 h-20 rounded-full border-4 border-amber-400 bg-white mr-6">
        <span className="text-4xl font-bold text-amber-500">{credits}</span>
      </div>
      {/* Info */}
      <div className="flex-1">
        <div className="font-semibold text-gray-900 text-base mb-1 flex items-center space-x-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <span>REMAINING CREDITS</span>
        </div>
        <div className="text-gray-600 text-sm mb-3">
          {description || "Used to book mentor sessions. 1 credit = 1 hour."}
        </div>
        {onRefill && (
          <button
            onClick={onRefill}
            className="px-4 py-1 bg-amber-100 text-amber-700 rounded-lg font-medium text-sm shadow-sm hover:bg-amber-200 transition-colors"
          >
            Refill now
          </button>
        )}
      </div>
    </div>
  );
};

export default CreditWidget; 