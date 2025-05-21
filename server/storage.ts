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
