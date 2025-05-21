import React from 'react';
import { Todo } from '@/lib/types';

interface TasksListProps {
  todos: Todo[];
  isLoading: boolean;
  onToggleComplete: (todo: Todo) => void;
  onEditTask: (todo: Todo) => void;
  onDeleteTask: (todo: Todo) => void;
  onAddTask: () => void;
}

const TasksList: React.FC<TasksListProps> = ({
  todos,
  isLoading,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onAddTask,
}) => {
  // Format date to display
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Reset hours to compare dates properly
    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    
    if (date.getTime() === today.getTime()) return 'Due Today';
    if (date.getTime() === tomorrow.getTime()) return 'Due Tomorrow';
    
    return `Due ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  };
  
  // Get category styling
  const getCategoryStyle = (category?: string) => {
    switch (category?.toLowerCase()) {
      case 'work':
        return 'bg-blue-100 text-blue-800';
      case 'personal':
        return 'bg-green-100 text-green-800';
      case 'urgent':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {/* Loading State */}
      {isLoading && (
        <div className="col-span-full text-center py-10">
          <div className="inline-flex items-center px-4 py-2 font-semibold text-primary">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading tasks<span className="loading"></span></span>
          </div>
        </div>
      )}
      
      {/* Empty State */}
      {!isLoading && todos.length === 0 && (
        <div className="col-span-full bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
            <span className="material-icons text-slate-400 text-2xl">task</span>
          </div>
          <h3 className="text-lg font-medium text-slate-800 mb-2">No tasks yet</h3>
          <p className="text-slate-600 mb-4">Create your first task to get started</p>
          <button 
            className="px-4 py-2 bg-primary text-white rounded-lg shadow-sm hover:bg-indigo-600 transition-colors"
            onClick={onAddTask}
          >
            Create a Task
          </button>
        </div>
      )}
      
      {/* Task Cards */}
      {!isLoading && todos.map((todo) => (
        <div 
          key={todo.id}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col task-card transition-all"
        >
          <div className="flex items-start mb-3 justify-between">
            <div className="flex items-start">
              <div className="mr-3">
                <button 
                  onClick={() => onToggleComplete(todo)}
                  className={`w-6 h-6 rounded-full border-2 ${todo.completed ? 'border-slate-300 bg-slate-100' : 'border-primary'} flex items-center justify-center`}
                >
                  {todo.completed && (
                    <span className="material-icons text-success text-sm">check</span>
                  )}
                </button>
              </div>
              <div>
                <h3 className={`font-medium text-slate-800 ${todo.completed ? 'line-through opacity-60' : ''}`}>{todo.title}</h3>
                {todo.description && (
                  <p className={`text-sm text-slate-600 line-clamp-2 ${todo.completed ? 'line-through opacity-60' : ''}`}>
                    {todo.description}
                  </p>
                )}
              </div>
            </div>
            <div className="flex">
              <button 
                onClick={() => onEditTask(todo)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <span className="material-icons text-sm">edit</span>
              </button>
              <button 
                onClick={() => onDeleteTask(todo)}
                className="ml-2 text-slate-400 hover:text-error transition-colors"
              >
                <span className="material-icons text-sm">delete</span>
              </button>
            </div>
          </div>
          <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
            {todo.category && (
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryStyle(todo.category)}`}>
                {todo.category.charAt(0).toUpperCase() + todo.category.slice(1)}
              </span>
            )}
            {todo.dueDate && (
              <span className="text-xs text-slate-500">
                {todo.completed ? 'Completed' : formatDate(todo.dueDate)}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TasksList;
