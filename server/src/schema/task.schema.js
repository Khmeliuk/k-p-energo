import { z } from "zod";

export const createTaskSchema = z.object({
  owner: z
    .number()
    .int()
    .positive("Owner ID must be positive")
    .refine(
      async (ownerId) => {
        const user = await prisma.user.findUnique({
          where: { id: ownerId },
        });
        return !!user; // true якщо користувач існує
      },
      { message: "Owner user does not exist" }
    ),
  status: z.enum(["виконується", "виконанно", "скасовано", "відкладенно"]),
  department: z
    .number()
    .int()
    .refine((n) => [1, 2, 3, 4].includes(n), {
      message: "Department must be 1, 2, 3, or 4",
    }),
  task: z.array(z.string()).min(1, "At least one task is required"),
  address: z.string().trim().min(1, "Address is required"),
  dateCreateTask: z.string().datetime("Invalid datetime format"),
  dateToEndTask: z.string().datetime("Invalid datetime format").optional(),
  description: z.array(z.string()).optional(),
});

export const updateTaskSchema = createTaskSchema.partial();
