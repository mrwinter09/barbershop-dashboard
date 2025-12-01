/** @format */

import * as Yup from "yup";

export const userSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  website: Yup.string().optional(),
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("City is required"),
  zipcode: Yup.string().required("City is required"),
});

export type UserFormValues = Yup.InferType<typeof userSchema>;
