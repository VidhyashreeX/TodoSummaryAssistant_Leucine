import { Todo } from "@shared/schema";

/**
 * Generates a summary of pending todos
 * @param todos List of todos to summarize
 * @returns A promise resolving to the summary
 */
export async function generateTodoSummary(todos: Todo[]): Promise<string> {
  // Only summarize pending todos
  const pendingTodos = todos.filter(todo => !todo.completed);

  if (pendingTodos.length === 0) {
    return "You have no pending tasks. Great job!";
  }
  
  try {
    // Since we're using a simplified approach without external APIs,
    // we'll generate a summary based on the todo data directly
    
    // Count tasks by category
    const categories: Record<string, number> = {};
    pendingTodos.forEach(todo => {
      const category = todo.category || 'uncategorized';
      categories[category] = (categories[category] || 0) + 1;
    });
    
    // Find urgent tasks
    const urgentTasks = pendingTodos.filter(todo => 
      todo.category?.toLowerCase() === 'urgent' || 
      (todo.dueDate && new Date(todo.dueDate) <= new Date())
    );
    
    // Sort tasks by due date (if available)
    const sortedTasks = [...pendingTodos].sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
    
    // Get the top 5 most important tasks (prioritize tasks with due dates)
    const topTasks = sortedTasks.slice(0, 5);
    
    // Build the summary
    let summary = `You have ${pendingTodos.length} pending task${pendingTodos.length !== 1 ? 's' : ''}.`;
    
    // Add category breakdown if there are multiple categories
    if (Object.keys(categories).length > 1) {
      summary += ' Breakdown by category: ';
      summary += Object.entries(categories)
        .map(([category, count]) => `${count} ${category}`)
        .join(', ');
      summary += '.';
    }
    
    // Add urgent tasks section
    if (urgentTasks.length > 0) {
      summary += `\n\nYou have ${urgentTasks.length} urgent task${urgentTasks.length !== 1 ? 's' : ''} that need${urgentTasks.length === 1 ? 's' : ''} immediate attention:`;
      urgentTasks.forEach(task => {
        summary += `\n- ${task.title}${task.dueDate ? ` (due: ${task.dueDate})` : ''}`;
      });
    }
    
    // Add top tasks section
    summary += '\n\nHere are your most important tasks:';
    topTasks.forEach(task => {
      const dueStr = task.dueDate ? ` (due: ${task.dueDate})` : '';
      const categoryStr = task.category ? ` [${task.category}]` : '';
      summary += `\n- ${task.title}${dueStr}${categoryStr}`;
    });
    
    // Add advice
    summary += '\n\nSuggested approach:';
    if (urgentTasks.length > 0) {
      summary += '\n1. Focus on completing urgent tasks first';
    }
    summary += '\n2. Break down large tasks into smaller steps';
    summary += '\n3. Consider scheduling specific time blocks for each task';
    
    return summary;
  } catch (error: any) {
    console.error("Error generating summary:", error);
    throw new Error(`Failed to generate summary: ${error.message}`);
  }
}
