import React from 'react';
import ReactDOM from 'react-dom';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, title, message, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-40" onClick={onCancel} />
      {/* Modal Panel */}
      <div className="relative bg-white rounded-xl shadow-xl max-w-sm w-full p-6 z-50 flex flex-col items-center border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 mb-6 text-center">{message}</p>
        <div className="flex space-x-4 w-full">
          <button
            className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="flex-1 py-2 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal; 