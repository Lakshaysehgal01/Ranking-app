import z from "zod";

export const userZodSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  name: z
    .string()
    .min(1, { message: "Username must be atleast 1 character" }),
});
