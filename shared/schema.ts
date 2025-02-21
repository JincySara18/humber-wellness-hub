import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  isAdmin: boolean("is_admin").default(false),
});

export const counselors = pgTable("counselors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  specialization: text("specialization").notNull(),
  imageUrl: text("image_url").notNull(),
  availability: text("availability").notNull(),
});

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  counselorId: integer("counselor_id").notNull(),
  date: timestamp("date").notNull(),
  status: text("status").notNull(),
  type: text("type").notNull(),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  message: text("message").notNull(),
  response: text("response").notNull(),
  timestamp: timestamp("timestamp").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
});

export const insertAppointmentSchema = createInsertSchema(appointments);
export const insertChatMessageSchema = createInsertSchema(chatMessages);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Counselor = typeof counselors.$inferSelect;
export type Appointment = typeof appointments.$inferSelect;
export type ChatMessage = typeof chatMessages.$inferSelect;
