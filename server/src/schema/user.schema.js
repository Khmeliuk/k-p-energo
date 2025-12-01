import { z } from "zod";

export const createUserInputSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required"),
    lastName: z.string().trim().min(1, "Last name is required"),
    email: z.string().email("Invalid email").toLowerCase(),
    role: z.enum(["super user", "admin", "user"]).default("user"),
    department: z.enum(["1", "2", "3"], {
      errorMap: () => ({ message: "Department must be 1, 2, or 3" }),
    }),
    password: z.string().min(5, "Min 5 chars").max(16, "Max 16 chars"),
    confirmPassword: z.string(),
    isActive: z.boolean().default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .strip();

export const updateUserSchema = z
  .object({
    name: z.string().trim().min(1, "Name cannot be empty").optional(),
    lastName: z.string().trim().min(1, "Last name cannot be empty").optional(),
    email: z.string().email("Invalid email").toLowerCase().optional(),
    role: z.enum(["super user", "admin", "user"]).optional(),
    department: z.enum(["1", "2", "3"]).optional(),
    isActive: z.boolean().optional(),
  })
  .strip()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

export const userIdSchema = z.object({
  id: z.string().uuid("Invalid user ID format"),
});

export const paginationSchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).default("1"),
  limit: z.string().regex(/^\d+$/).transform(Number).default("10"),
  search: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});
