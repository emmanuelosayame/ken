import { z } from "zod";

export const createContact = z.object({
  name: z.string().max(100, "too long").optional(),
  emailphone: z.string().min(1, "required").max(100, "too long"),
  message: z
    .string({ required_error: "you need to enter your message" })
    .min(1, "required")
    .max(700, "invalid message"),
});

export type CreateContact = z.infer<typeof createContact>;
