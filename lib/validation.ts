import { object, string } from "yup";

export const checkoutVS = object().shape({
  name: string().min(2, "too short").max(100, "too long").required(),
});
