import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { getChatbotResponse } from "./openai";
import { insertAppointmentSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Get counselors
  app.get("/api/counselors", async (req, res) => {
    const counselors = await storage.getCounselors();
    res.json(counselors);
  });

  // Get appointments
  app.get("/api/appointments", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const appointments = await storage.getAppointments(req.user.id);
    res.json(appointments);
  });

  // Create appointment
  app.post("/api/appointments", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const parsed = insertAppointmentSchema.parse({
      ...req.body,
      userId: req.user.id,
      status: "scheduled",
    });
    
    const appointment = await storage.createAppointment(parsed);
    res.status(201).json(appointment);
  });

  // Chat endpoint
  app.post("/api/chat", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const { message } = req.body;
    const response = await getChatbotResponse(message);
    
    const chatMessage = await storage.saveChatMessage({
      userId: req.user.id,
      message,
      response,
      timestamp: new Date(),
    });
    
    res.json(chatMessage);
  });

  // Get chat history
  app.get("/api/chat/history", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const history = await storage.getChatHistory(req.user.id);
    res.json(history);
  });

  const httpServer = createServer(app);
  return httpServer;
}
