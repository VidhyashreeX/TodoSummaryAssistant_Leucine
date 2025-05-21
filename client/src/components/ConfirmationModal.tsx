import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" onClick={onCancel}></div>
        
        <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-slate-800">{title}</h3>
            <button className="text-slate-400 hover:text-slate-600" onClick={onCancel}>
              <span className="material-icons">close</span>
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
              <span className="material-icons text-error">delete</span>
            </div>
            <p className="text-center text-slate-700">{message}</p>
          </div>
          
          <div className="flex items-center justify-center space-x-3">
            <button 
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
              onClick={onCancel}
            >
              {cancelText}
            </button>
            <button 
              className="px-4 py-2 bg-error text-white rounded-lg shadow-sm hover:bg-red-600 transition-colors"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
