/** @format */

import { Formik, Form } from "formik";
import { TextInput, Group, Button, Stack } from "@mantine/core";
import { userSchema, type UserFormValues } from "../validation/userSchema";

interface UserFormProps {
  initialValues?: UserFormValues;
  onSubmit: (values: UserFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
}

const defaultValues: UserFormValues = {
  name: "",
  username: "",
  email: "",
  phone: "",
  website: "",
};

export default function UserForm({
  initialValues = defaultValues,
  onSubmit,
  isSubmitting,
}: UserFormProps) {
  return (
    <Formik<UserFormValues>
      initialValues={initialValues}
      validationSchema={userSchema}
      onSubmit={onSubmit}>
      {({ values, errors, touched, handleChange }) => (
        <Form>
          <Stack gap="sm">
            <TextInput
              label="Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              error={touched.name && errors.name}
            />
            <TextInput
              label="Username"
              name="username"
              value={values.username}
              onChange={handleChange}
              error={touched.username && errors.username}
            />
            <TextInput
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={touched.email && errors.email}
            />
            <TextInput
              label="Phone"
              name="phone"
              value={values.phone ?? ""}
              onChange={handleChange}
            />
            <TextInput
              label="Website"
              name="website"
              value={values.website ?? ""}
              onChange={handleChange}
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit" loading={isSubmitting}>
                Save client
              </Button>
            </Group>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
