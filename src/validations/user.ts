import { z } from "zod";

export const userSchema = z.object({
  name: z.string().nonempty(), // companyName
  email: z.string().email().nonempty(),
});

export const updateUserSchema = userSchema.omit({ email: true });

export type User = z.infer<typeof userSchema>;

export type UpdateUser = z.infer<typeof updateUserSchema>;
