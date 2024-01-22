import { z } from "zod";

export const categorySchema = z.object({
  name: z.string(),
  questions: z.array(z.string()),
});

export type ICategory = z.infer<typeof categorySchema>;

export const gameCardSchema = z.object({
  question: z.string(),
  category: z.string(),
});

export type IGameCard = z.infer<typeof gameCardSchema>;

export const databaseSchema = z.array(categorySchema);

export type Database = z.infer<typeof databaseSchema>;

export type Error = { message: string };
export type Result<T> =
  | { verdict: "success"; data: T }
  | { verdict: "error"; error: Error };