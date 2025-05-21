import React from 'react';

interface TaskControlsProps {
  searchQuery: string;
  filterStatus: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  onAddTaskClick: () => void;
}

const TaskControls: React.FC<TaskControlsProps> = ({
  searchQuery,
  filterStatus,
  onSearchChange,
  onFilterChange,
  onAddTaskClick,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <span className="material-icons absolute left-3 top-2.5 text-slate-400">search</span>
          </div>
          <select 
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={filterStatus}
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <button 
          onClick={onAddTaskClick}
          className="px-4 py-2 bg-accent text-white rounded-lg shadow-sm hover:bg-rose-600 transition-colors flex items-center justify-center"
        >
          <span className="material-icons mr-2">add</span>
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskControls;
