import React from 'react';
import { Link, useLocation } from 'wouter';

const Sidebar: React.FC = () => {
  const [location] = useLocation();

  return (
    <aside className="bg-white border-r border-slate-200 md:w-64 md:fixed md:h-full z-10 shadow-sm">
      <div className="flex items-center justify-center h-16 border-b border-slate-200">
        <h1 className="text-xl font-semibold text-slate-800 flex items-center">
          <span className="material-icons mr-2 text-primary">checklist</span>
          Todo Summary
        </h1>
      </div>
      <nav className="p-4">
        <ul>
          <li className="mb-2">
            <Link 
              href="/"
              className={`flex items-center p-2 rounded-lg text-slate-800 ${location === '/' ? 'bg-slate-100 font-medium' : 'hover:bg-slate-100 transition-colors'}`}
            >
              <span className="material-icons mr-3">check_box</span>
              Tasks
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              href="#"
              className="flex items-center p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <span className="material-icons mr-3">bar_chart</span>
              Statistics
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              href="#"
              className="flex items-center p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <span className="material-icons mr-3">calendar_month</span>
              Calendar
            </Link>
          </li>
          <li className="mb-2">
            <Link 
              href="#"
              className="flex items-center p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <span className="material-icons mr-3">settings</span>
              Settings
            </Link>
          </li>
        </ul>
      </nav>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center text-white">
            <span className="material-icons">person</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-slate-700">User</p>
            <p className="text-xs text-slate-500">Free Account</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
