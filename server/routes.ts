import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertTodoSchema, updateTodoSchema } from "@shared/schema";
import { generateTodoSummary } from "./openai";
import { sendSummaryToSlack } from "./slack";

export async function registerRoutes(app: Express): Promise<Server> {
  // Todo Routes
  // GET /api/todos - Fetch all todos
  app.get("/api/todos", async (req, res) => {
    try {
      const todos = await storage.getTodos();
      res.json(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
      res.status(500).json({ message: "Failed to fetch todos" });
    }
  });

  // GET /api/todos/:id - Fetch a specific todo
  app.get("/api/todos/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid todo ID" });
      }
      
      const todo = await storage.getTodo(id);
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      
      res.json(todo);
    } catch (error) {
      console.error("Error fetching todo:", error);
      res.status(500).json({ message: "Failed to fetch todo" });
    }
  });

  // POST /api/todos - Create a new todo
  app.post("/api/todos", async (req, res) => {
    try {
      const result = insertTodoSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid todo data", errors: result.error.format() });
      }
      
      const todo = await storage.createTodo(result.data);
      res.status(201).json(todo);
    } catch (error) {
      console.error("Error creating todo:", error);
      res.status(500).json({ message: "Failed to create todo" });
    }
  });

  // PUT /api/todos/:id - Update a todo
  app.put("/api/todos/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid todo ID" });
      }
      
      const result = updateTodoSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid todo data", errors: result.error.format() });
      }
      
      const updatedTodo = await storage.updateTodo(id, result.data);
      if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      
      res.json(updatedTodo);
    } catch (error) {
      console.error("Error updating todo:", error);
      res.status(500).json({ message: "Failed to update todo" });
    }
  });

  // DELETE /api/todos/:id - Delete a todo
  app.delete("/api/todos/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid todo ID" });
      }
      
      const success = await storage.deleteTodo(id);
      if (!success) {
        return res.status(404).json({ message: "Todo not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting todo:", error);
      res.status(500).json({ message: "Failed to delete todo" });
    }
  });

  // POST /api/summarize - Summarize todos using LLM and optionally send to Slack
  app.post("/api/summarize", async (req, res) => {
    try {
      const sendToSlack = req.body.sendToSlack === true;
      
      // Get all todos
      const todos = await storage.getTodos();
      
      // Generate summary using OpenAI
      const summary = await generateTodoSummary(todos);
      
      const response: { summary: string; slack?: { success: boolean; message: string } } = { summary };
      
      // Send to Slack if requested
      if (sendToSlack) {
        const slackResult = await sendSummaryToSlack(summary);
        response.slack = slackResult;
      }
      
      res.json(response);
    } catch (error) {
      console.error("Error generating summary:", error);
      res.status(500).json({ message: `Failed to generate summary: ${error.message}` });
    }
  });

  // Send summary to Slack
  app.post("/api/send-to-slack", async (req, res) => {
    try {
      const { summary } = req.body;
      
      if (!summary || typeof summary !== "string") {
        return res.status(400).json({ message: "Summary is required" });
      }
      
      const result = await sendSummaryToSlack(summary);
      res.json(result);
    } catch (error) {
      console.error("Error sending to Slack:", error);
      res.status(500).json({ message: `Failed to send to Slack: ${error.message}` });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
