/** @format */

import * as Yup from "yup";

export const userSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().optional(),
  website: Yup.string().optional(),
});

export type UserFormValues = Yup.InferType<typeof userSchema>;
