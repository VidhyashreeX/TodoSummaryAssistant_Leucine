import { HfInference } from "@huggingface/inference";
import { Todo } from "@shared/schema";

// Create a new HuggingFace Inference instance
// The access token can be optionally provided through the HUGGINGFACE_API_KEY env variable
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// We'll use a free, open-source model like "google/flan-t5-xl" or "tiiuae/falcon-7b-instruct"
const MODEL_ID = "tiiuae/falcon-7b-instruct";

/**
 * Generates a summary of pending todos using Hugging Face models
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
    const prompt = `
    I have the following pending tasks. Please provide a concise summary of my tasks, prioritizing by urgency and due date where available:
    
    ${pendingTodos.map(todo => {
      const dueStr = todo.dueDate ? ` (due: ${todo.dueDate})` : '';
      const categoryStr = todo.category ? ` [${todo.category}]` : '';
      return `- ${todo.title}${dueStr}${categoryStr}: ${todo.description || 'No description'}`;
    }).join('\n')}
    
    In your summary:
    1. Start with the total number of pending tasks
    2. Identify any urgent tasks
    3. List 3-5 tasks that need the most immediate attention
    4. Provide brief, actionable advice on how to approach these tasks
    
    Keep your response concise and direct.
    `;

    // Use text generation with the Hugging Face model
    const result = await hf.textGeneration({
      model: MODEL_ID,
      inputs: prompt,
      parameters: {
        max_new_tokens: 256,
        temperature: 0.7,
        top_p: 0.95,
        repetition_penalty: 1.2
      }
    });

    // Extract the generated text
    const summary = result.generated_text.trim();
    return summary || "Failed to generate summary.";
  } catch (error) {
    console.error("Error generating summary:", error);
    throw new Error(`Failed to generate summary: ${error.message}`);
  }
}
