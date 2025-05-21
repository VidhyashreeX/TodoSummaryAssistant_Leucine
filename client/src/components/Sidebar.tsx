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
        </ul>
      </nav>
      <div className="p-4 mt-6">
        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
          <h3 className="font-medium text-indigo-700 mb-2 flex items-center">
            <span className="material-icons mr-2 text-sm">tips_and_updates</span>
            Quick Tip
          </h3>
          <p className="text-sm text-indigo-600">
            Use the "Generate Summary" button to create a quick overview of your pending tasks.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
