import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().email("Invalid email").toLowerCase(),
  role: z.enum(["super user", "admin", "user"]).default("user"),
  department: z.enum(["1", "2", "3"]),
  password: z.string().min(5, "Min 5 chars").max(16, "Max 16 chars"),
  isActive: z.boolean().default(false),
});

export const updateUserSchema = createUserSchema.partial();
