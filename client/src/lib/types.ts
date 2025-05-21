export type TodoCategory = 'work' | 'personal' | 'urgent' | 'other';

export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  category?: string;
}

export interface TodoFormData {
  title: string;
  description?: string;
  completed?: boolean;
  dueDate?: string;
  category?: string;
}

export type SortOption = 'dueDate' | 'title' | 'category';
export type FilterOption = 'all' | 'pending' | 'completed';

export interface SummaryResponse {
  summary: string;
  slack?: {
    success: boolean;
    message: string;
  };
}
