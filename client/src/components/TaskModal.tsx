import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Todo, TodoFormData } from '@/lib/types';

interface TaskModalProps {
  isOpen: boolean;
  mode: 'add' | 'edit';
  currentTask?: Todo;
  onClose: () => void;
  onSubmit: (data: TodoFormData) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  mode,
  currentTask,
  onClose,
  onSubmit,
}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TodoFormData>({
    defaultValues: {
      title: '',
      description: '',
      dueDate: '',
      category: 'work',
    }
  });

  // Reset form when modal opens or currentTask changes
  useEffect(() => {
    if (currentTask && mode === 'edit') {
      reset({
        title: currentTask.title,
        description: currentTask.description || '',
        dueDate: currentTask.dueDate || '',
        category: currentTask.category || 'work',
      });
    } else if (mode === 'add') {
      reset({
        title: '',
        description: '',
        dueDate: '',
        category: 'work',
      });
    }
  }, [currentTask, mode, reset, isOpen]);

  if (!isOpen) return null;

  const handleFormSubmit = (data: TodoFormData) => {
    onSubmit(data);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto flex"
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" 
          onClick={onClose}
        ></div>
        
        <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-slate-800">
              {mode === 'add' ? 'Add New Task' : 'Edit Task'}
            </h3>
            <button className="text-slate-400 hover:text-slate-600" onClick={onClose}>
              <span className="material-icons">close</span>
            </button>
          </div>

          {/* Task Form */}
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Title</label>
              <input 
                type="text" 
                id="title"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Task title"
                {...register('title', { required: true })}
              />
              {errors.title && (
                <p className="text-xs text-error mt-1">Title is required</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea 
                id="description"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Task description"
                rows={3}
                {...register('description')}
              ></textarea>
            </div>
            
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
                <input 
                  type="date" 
                  id="dueDate"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  {...register('dueDate')}
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select 
                  id="category"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  {...register('category')}
                >
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="urgent">Urgent</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
              <button 
                type="button" 
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-primary text-white rounded-lg shadow-sm hover:bg-indigo-600 transition-colors"
              >
                {mode === 'add' ? 'Add Task' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
