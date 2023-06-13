import { z } from "zod";

const createVS = z.object({
  fullName: z.string().min(2, "too short").max(100, "too long"),
  email: z.string().min(1, "required").email("invalid email"),
  phone: z.string().min(1, "required").max(13, "invalid phone"),
  location: z.string().max(100, "too long").optional(),
  password: z.string().min(8, "too short").max(100, "oops"),
  confirmPassword: z.string().min(8, "too short").max(100, "oops"),
  agreeTC: z.literal<boolean>(true, {
    required_error: "you must accept ",
    invalid_type_error: "you must accept ",
  }),
});

export const loginVS = createVS.pick({ email: true, password: true });

export const profileVS = createVS.omit({
  agreeTC: true,
  password: true,
  confirmPassword: true,
});

export const createProfileVS = createVS.refine(
  ({ password, confirmPassword }) => password === confirmPassword,
  {
    message: "passwords don't match",
    path: ["confirmPassword"],
  }
);

export type CreateFormValues = z.infer<typeof createProfileVS>;
export type LoginFormValues = z.infer<typeof loginVS>;
export type ProfileFormValues = z.infer<typeof profileVS>;

// export const contactVS = object().shape({
//   name: string()
//     .min(2, "too short")
//     .max(70, "too long")
//     .required("you need to specify"),
//   emailphone: string().max(50, "too long").required("you need to specify"),
//   message: string()
//     .max(500, "too long")
//     .required("you need to write a message"),
// });
