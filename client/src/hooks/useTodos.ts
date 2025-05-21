import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Todo, TodoFormData, SummaryResponse } from '@/lib/types';

export function useTodos() {
  const queryClient = useQueryClient();
  
  // Fetch all todos
  const {
    data: todos = [] as Todo[],
    isLoading,
    isError,
    error,
  } = useQuery<Todo[]>({
    queryKey: ['/api/todos'],
  });

  // Create todo mutation
  const createTodoMutation = useMutation({
    mutationFn: async (todo: TodoFormData) => {
      const res = await apiRequest('POST', '/api/todos', todo);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/todos'] });
    },
  });

  // Update todo mutation
  const updateTodoMutation = useMutation({
    mutationFn: async ({ id, ...todo }: Todo) => {
      const res = await apiRequest('PUT', `/api/todos/${id}`, todo);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/todos'] });
    },
  });

  // Delete todo mutation
  const deleteTodoMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/todos/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/todos'] });
    },
  });

  // Toggle completion status
  const toggleCompletionMutation = useMutation({
    mutationFn: async (todo: Todo) => {
      const res = await apiRequest('PUT', `/api/todos/${todo.id}`, {
        ...todo,
        completed: !todo.completed,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/todos'] });
    },
  });

  // Generate summary mutation
  const generateSummaryMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/summarize', {});
      return res.json() as Promise<SummaryResponse>;
    },
  });

  // Send summary to Slack
  const sendToSlackMutation = useMutation({
    mutationFn: async (summary: string) => {
      const res = await apiRequest('POST', '/api/send-to-slack', { summary });
      return res.json();
    },
  });

  return {
    todos,
    isLoading,
    isError,
    error,
    createTodo: createTodoMutation,
    updateTodo: updateTodoMutation,
    deleteTodo: deleteTodoMutation,
    toggleCompletion: toggleCompletionMutation,
    generateSummary: generateSummaryMutation,
    sendToSlack: sendToSlackMutation,
  };
}
