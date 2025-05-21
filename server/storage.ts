import { users, type User, type InsertUser, todos, type Todo, type InsertTodo, type UpdateTodo } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Todo operations
  getTodos(): Promise<Todo[]>;
  getTodo(id: number): Promise<Todo | undefined>;
  createTodo(todo: InsertTodo): Promise<Todo>;
  updateTodo(id: number, todo: UpdateTodo): Promise<Todo | undefined>;
  deleteTodo(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private todos: Map<number, Todo>;
  private userCurrentId: number;
  private todoCurrentId: number;

  constructor() {
    this.users = new Map();
    this.todos = new Map();
    this.userCurrentId = 1;
    this.todoCurrentId = 1;
    
    // Add some sample tasks
    this.addSampleTasks();
  }
  
  private addSampleTasks() {
    // Sample task 1
    this.todos.set(this.todoCurrentId, {
      id: this.todoCurrentId++,
      title: "Build fullstack Todo Summary Assistant",
      description: "Create a React frontend and Express backend that can manage tasks and generate summaries",
      completed: false,
      dueDate: "2025-05-30",
      category: "work"
    });
    
    // Sample task 2
    this.todos.set(this.todoCurrentId, {
      id: this.todoCurrentId++,
      title: "Implement OpenAI integration",
      description: "Add ability to summarize todos using an AI model",
      completed: false,
      dueDate: "2025-05-25",
      category: "urgent"
    });
    
    // Sample task 3
    this.todos.set(this.todoCurrentId, {
      id: this.todoCurrentId++,
      title: "Set up Slack integration",
      description: "Enable sending todo summaries to a Slack channel",
      completed: false,
      dueDate: "2025-05-28",
      category: "work"
    });
    
    // Sample task 4
    this.todos.set(this.todoCurrentId, {
      id: this.todoCurrentId++,
      title: "Write project documentation",
      description: "Create a README with setup instructions and screenshots",
      completed: false,
      dueDate: "2025-06-02",
      category: "work"
    });
    
    // Sample task 5
    this.todos.set(this.todoCurrentId, {
      id: this.todoCurrentId++,
      title: "Deploy application",
      description: "Deploy the app to a hosting service and test all features",
      completed: false,
      dueDate: "2025-06-05",
      category: "work"
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Todo operations
  async getTodos(): Promise<Todo[]> {
    return Array.from(this.todos.values());
  }

  async getTodo(id: number): Promise<Todo | undefined> {
    return this.todos.get(id);
  }

  async createTodo(insertTodo: InsertTodo): Promise<Todo> {
    const id = this.todoCurrentId++;
    const todo: Todo = { ...insertTodo, id };
    this.todos.set(id, todo);
    return todo;
  }

  async updateTodo(id: number, updateTodo: UpdateTodo): Promise<Todo | undefined> {
    const existingTodo = this.todos.get(id);
    
    if (!existingTodo) {
      return undefined;
    }

    const updatedTodo: Todo = {
      ...existingTodo,
      ...updateTodo,
    };

    this.todos.set(id, updatedTodo);
    return updatedTodo;
  }

  async deleteTodo(id: number): Promise<boolean> {
    return this.todos.delete(id);
  }
}

export const storage = new MemStorage();
