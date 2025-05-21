import { Todo } from "@shared/schema";
import axios from "axios";

// DeepSeek API configuration
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || "sk-3d1a8bfd824c4683b666fd58687f398d";
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

/**
 * Generates a summary of pending todos using DeepSeek's API
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
    // Prepare the task data for DeepSeek
    const taskList = pendingTodos.map(todo => {
      const dueStr = todo.dueDate ? ` (due: ${todo.dueDate})` : '';
      const categoryStr = todo.category ? ` [${todo.category}]` : '';
      return `- ${todo.title}${dueStr}${categoryStr}: ${todo.description || 'No description'}`;
    }).join('\n');
    
    // Create prompt for DeepSeek
    const prompt = `
    I have the following pending tasks. Please provide a concise summary of my tasks, prioritizing by urgency and due date where available:
    
    ${taskList}
    
    In your summary:
    1. Start with the total number of pending tasks
    2. Identify any urgent tasks
    3. List 3-5 tasks that need the most immediate attention
    4. Provide brief, actionable advice on how to approach these tasks
    
    Keep your response concise and direct.
    `;

    // Call DeepSeek API
    try {
      const response = await axios.post(
        DEEPSEEK_API_URL,
        {
          model: "deepseek-chat",
          messages: [
            { role: "user", content: prompt }
          ],
          max_tokens: 500,
          temperature: 0.7
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
          }
        }
      );
      
      // Extract the summary from the response
      if (response.data && 
          response.data.choices && 
          response.data.choices.length > 0 && 
          response.data.choices[0].message && 
          response.data.choices[0].message.content) {
        return response.data.choices[0].message.content.trim();
      }
      
      throw new Error("Invalid response format from DeepSeek API");
    } catch (apiError: any) {
      console.error("DeepSeek API error:", apiError.response?.data || apiError.message);
      
      // If the API fails, use our fallback summary generator
      return generateFallbackSummary(pendingTodos);
    }
  } catch (error: any) {
    console.error("Error generating summary:", error);
    throw new Error(`Failed to generate summary: ${error.message}`);
  }
}

/**
 * Fallback function to generate summary if API fails
 */
function generateFallbackSummary(pendingTodos: Todo[]): string {
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
}
