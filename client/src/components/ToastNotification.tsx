import React from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastNotificationProps {
  type: ToastType;
  title: string;
  message: string;
  onClose: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ 
  type, 
  title, 
  message, 
  onClose 
}) => {
  const getIconByType = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <span className="material-icons text-success">check_circle</span>;
      case 'error':
        return <span className="material-icons text-error">error</span>;
      case 'warning':
        return <span className="material-icons text-warning">warning</span>;
      case 'info':
        return <span className="material-icons text-primary">info</span>;
      default:
        return <span className="material-icons text-primary">info</span>;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-xs w-full bg-white rounded-lg shadow-lg border border-slate-200 p-4 flex items-start transition-all transform translate-y-0 opacity-100">
      <div className="flex-shrink-0 mr-3">
        {getIconByType(type)}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium text-slate-800">{title}</h4>
        <p className="text-xs text-slate-600">{message}</p>
      </div>
      <button className="ml-4 text-slate-400 hover:text-slate-600" onClick={onClose}>
        <span className="material-icons text-sm">close</span>
      </button>
    </div>
  );
};

export default ToastNotification;
