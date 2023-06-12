import { bool, object, ref, string } from "yup";

export const checkoutVS = object().shape({
  name: string()
    .min(2, "too short")
    .max(100, "too long")
    .required("you need to specify"),
  phone: string().max(13, "too long").required("you need to specify"),
  location: string().max(100, "too long").required("you need to specify"),
  notes: string().max(200, "too long"),
});

export const createPVS = object().shape({
  fullName: string()
    .min(2, "too short")
    .max(100, "too long")
    .required("you need to specify"),
  email: string()
    .email("invalid email")
    .max(150, "too long")
    .required("you need to specify"),
  phone: string().max(15, "too long").required("you need to specify"),
  location: string().max(100, "too long").required("you need to specify"),
  password: string()
    .min(8, "cannot be less than 8")
    .max(30, "")
    .required("enter password"),
  confirmPassword: string()
    .oneOf([ref("password")], "Passwords don't match")
    .required("Passwords don't match"),
  agreeTC: bool().isTrue("please accept"),
});

export const contactVS = object().shape({
  name: string()
    .min(2, "too short")
    .max(70, "too long")
    .required("you need to specify"),
  emailphone: string().max(50, "too long").required("you need to specify"),
  message: string()
    .max(500, "too long")
    .required("you need to write a message"),
});
