import { InsertUser, User, Counselor, Appointment, ChatMessage } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getCounselors(): Promise<Counselor[]>;
  getAppointments(userId: number): Promise<Appointment[]>;
  createAppointment(appointment: Omit<Appointment, "id">): Promise<Appointment>;
  saveChatMessage(message: Omit<ChatMessage, "id">): Promise<ChatMessage>;
  getChatHistory(userId: number): Promise<ChatMessage[]>;
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private counselors: Map<number, Counselor>;
  private appointments: Map<number, Appointment>;
  private chatMessages: Map<number, ChatMessage>;
  private currentId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.counselors = new Map();
    this.appointments = new Map();
    this.chatMessages = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });

    // Initialize with sample counselors
    this.initializeCounselors();
  }

  private initializeCounselors() {
    const sampleCounselors: Omit<Counselor, "id">[] = [
      {
        name: "Dr. Sarah Johnson",
        specialization: "Career Development",
        imageUrl: "https://images.unsplash.com/photo-1561489422-45de3d015e3e",
        availability: "Monday, Wednesday, Friday",
      },
      {
        name: "Dr. Michael Chen",
        specialization: "Academic Planning",
        imageUrl: "https://images.unsplash.com/photo-1518152006812-edab29b069ac",
        availability: "Tuesday, Thursday",
      },
    ];

    sampleCounselors.forEach((counselor) => {
      const id = this.currentId++;
      this.counselors.set(id, { ...counselor, id });
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
    const id = this.currentId++;
    const user: User = { ...insertUser, id, isAdmin: false };
    this.users.set(id, user);
    return user;
  }

  async getCounselors(): Promise<Counselor[]> {
    return Array.from(this.counselors.values());
  }

  async getAppointments(userId: number): Promise<Appointment[]> {
    return Array.from(this.appointments.values()).filter(
      (apt) => apt.userId === userId,
    );
  }

  async createAppointment(appointment: Omit<Appointment, "id">): Promise<Appointment> {
    const id = this.currentId++;
    const newAppointment: Appointment = { ...appointment, id };
    this.appointments.set(id, newAppointment);
    return newAppointment;
  }

  async saveChatMessage(message: Omit<ChatMessage, "id">): Promise<ChatMessage> {
    const id = this.currentId++;
    const chatMessage: ChatMessage = { ...message, id };
    this.chatMessages.set(id, chatMessage);
    return chatMessage;
  }

  async getChatHistory(userId: number): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter((msg) => msg.userId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }
}

export const storage = new MemStorage();
