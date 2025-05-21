import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useTodos } from '@/hooks/useTodos';
import { Todo, TodoFormData, FilterOption, SummaryResponse } from '@/lib/types';

import Sidebar from '@/components/Sidebar';
import TaskControls from '@/components/TaskControls';
import TasksList from '@/components/TasksList';
import SummaryPanel from '@/components/SummaryPanel';
import TaskModal from '@/components/TaskModal';
import ConfirmationModal from '@/components/ConfirmationModal';

const HomePage: React.FC = () => {
  const { toast } = useToast();
  const {
    todos,
    isLoading,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleCompletion,
    generateSummary,
    sendToSlack,
  } = useTodos();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterOption>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Todo | undefined>(undefined);
  const [summary, setSummary] = useState<string>('');
  const [lastGeneratedAt, setLastGeneratedAt] = useState<string | null>(null);
  const [slackSendResult, setSlackSendResult] = useState<{ success: boolean; message: string } | null>(null);

  // Filter todos
  const filteredTodos = todos
    .filter((todo: Todo) => {
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          todo.title.toLowerCase().includes(query) ||
          (todo.description && todo.description.toLowerCase().includes(query))
        );
      }
      return true;
    })
    .filter((todo: Todo) => {
      // Apply status filter
      if (filterStatus === 'pending') return !todo.completed;
      if (filterStatus === 'completed') return todo.completed;
      return true;
    });

  // Event handlers
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleFilterChange = (value: string) => {
    setFilterStatus(value as FilterOption);
  };

  const handleToggleComplete = (todo: Todo) => {
    toggleCompletion.mutate(todo, {
      onSuccess: () => {
        toast({
          title: 'Task updated',
          description: `Task "${todo.title}" marked as ${!todo.completed ? 'completed' : 'pending'}`,
        });
      },
      onError: (error) => {
        toast({
          title: 'Error',
          description: `Failed to update task: ${error.message}`,
          variant: 'destructive',
        });
      },
    });
  };

  const handleAddTaskClick = () => {
    setCurrentTask(undefined);
    setIsAddModalOpen(true);
  };

  const handleEditTask = (todo: Todo) => {
    setCurrentTask(todo);
    setIsEditModalOpen(true);
  };

  const handleDeleteTask = (todo: Todo) => {
    setCurrentTask(todo);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (currentTask) {
      deleteTodo.mutate(currentTask.id, {
        onSuccess: () => {
          toast({
            title: 'Task deleted',
            description: `Task "${currentTask.title}" has been deleted`,
          });
          setIsDeleteModalOpen(false);
        },
        onError: (error) => {
          toast({
            title: 'Error',
            description: `Failed to delete task: ${error.message}`,
            variant: 'destructive',
          });
        },
      });
    }
  };

  const handleTaskSubmit = (data: TodoFormData) => {
    if (isEditModalOpen && currentTask) {
      // Edit existing task
      updateTodo.mutate({
        ...currentTask,
        ...data,
      }, {
        onSuccess: () => {
          toast({
            title: 'Task updated',
            description: `Task "${data.title}" has been updated`,
          });
          setIsEditModalOpen(false);
        },
        onError: (error) => {
          toast({
            title: 'Error',
            description: `Failed to update task: ${error.message}`,
            variant: 'destructive',
          });
        },
      });
    } else {
      // Create new task
      createTodo.mutate(data, {
        onSuccess: () => {
          toast({
            title: 'Task created',
            description: `Task "${data.title}" has been created`,
          });
          setIsAddModalOpen(false);
        },
        onError: (error) => {
          toast({
            title: 'Error',
            description: `Failed to create task: ${error.message}`,
            variant: 'destructive',
          });
        },
      });
    }
  };

  const handleGenerateSummary = () => {
    generateSummary.mutate(undefined, {
      onSuccess: (data: SummaryResponse) => {
        setSummary(data.summary);
        setLastGeneratedAt(new Date().toLocaleString());
        toast({
          title: 'Summary generated',
          description: 'Task summary has been generated successfully',
        });
      },
      onError: (error) => {
        toast({
          title: 'Error',
          description: `Failed to generate summary: ${error.message}`,
          variant: 'destructive',
        });
      },
    });
  };

  const handleSendToSlack = () => {
    if (!summary) {
      toast({
        title: 'No summary',
        description: 'Please generate a summary first',
        variant: 'destructive',
      });
      return;
    }

    sendToSlack.mutate(summary, {
      onSuccess: (data) => {
        setSlackSendResult(data);
        if (data.success) {
          toast({
            title: 'Sent to Slack',
            description: 'Summary has been sent to Slack successfully',
          });
        } else {
          toast({
            title: 'Error',
            description: `Failed to send to Slack: ${data.message}`,
            variant: 'destructive',
          });
        }
      },
      onError: (error) => {
        toast({
          title: 'Error',
          description: `Failed to send to Slack: ${error.message}`,
          variant: 'destructive',
        });
        setSlackSendResult({
          success: false,
          message: error.message,
        });
      },
    });
  };

  // Reset Slack result after 5 seconds
  useEffect(() => {
    if (slackSendResult) {
      const timer = setTimeout(() => {
        setSlackSendResult(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [slackSendResult]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 bg-background dark:bg-background">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">My Tasks</h2>
              <p className="text-slate-600">Manage your tasks and get summaries</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <button
                onClick={handleGenerateSummary}
                disabled={generateSummary.isPending}
                className="px-4 py-2 bg-primary text-white rounded-lg shadow-sm hover:bg-indigo-600 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generateSummary.isPending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <span className="material-icons mr-2">summarize</span>
                    Generate Summary
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Task Filter & Create */}
        <TaskControls
          searchQuery={searchQuery}
          filterStatus={filterStatus}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          onAddTaskClick={handleAddTaskClick}
        />

        {/* Tasks List */}
        <TasksList
          todos={filteredTodos}
          isLoading={isLoading}
          onToggleComplete={handleToggleComplete}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onAddTask={handleAddTaskClick}
        />

        {/* Summary Panel */}
        <SummaryPanel
          summary={summary}
          lastGeneratedAt={lastGeneratedAt}
          isGenerating={generateSummary.isPending}
          isSendingToSlack={sendToSlack.isPending}
          slackSendResult={slackSendResult}
          onGenerateSummary={handleGenerateSummary}
          onSendToSlack={handleSendToSlack}
        />
      </main>

      {/* Modals */}
      <TaskModal
        isOpen={isAddModalOpen}
        mode="add"
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleTaskSubmit}
      />

      <TaskModal
        isOpen={isEditModalOpen}
        mode="edit"
        currentTask={currentTask}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleTaskSubmit}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
