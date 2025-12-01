/** @format */
import {
  TextInput,
  Textarea,
  Text,
  Button,
  Paper,
  Stack,
  Title,
  Container,
  Group,
} from "@mantine/core";
import { Formik, Form } from "formik";
import hero from "../assets/hero.jpg";
import "../styles/global.css";

import * as Yup from "yup";

const contactSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string().required("Message is required"),
});

function AboutPage() {
  return (
    <>
      <div className="relative w-full h-[260px]">
        <img className="w-full h-full object-cover" alt="/" src={hero} />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center text-white">
          <Container size="lg">
            <Group justify="space-between">
              <div className="text-center w-full">
                <Title order={2}>Contact Form</Title>
                <Text c="white" size="xl">
                  For any questions, please fill in this contact form.
                </Text>
              </div>
            </Group>
          </Container>
        </div>
      </div>
      <div className="w-full bg-gray-50 py-16">
        <div className="max-w-[900px] mx-auto px-4">
          <Paper withBorder shadow="md" radius="md" p="lg">
            <Title order={3} mb="md">
              Contact Us
            </Title>

            <Formik
              initialValues={{ name: "", email: "", message: "" }}
              validationSchema={contactSchema}
              onSubmit={(values, { resetForm }) => {
                console.log("Contact form submitted:", values);
                alert("Message sent! (demo only)");
                resetForm();
              }}>
              {({ values, errors, touched, handleChange }) => (
                <Form>
                  <Stack gap="md">
                    <TextInput
                      label="Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      error={touched.name && errors.name}
                    />

                    <TextInput
                      label="Email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      error={touched.email && errors.email}
                    />

                    <Textarea
                      label="Message"
                      name="message"
                      minRows={4}
                      value={values.message}
                      onChange={handleChange}
                      error={touched.message && errors.message}
                    />

                    <Button type="submit" color="blue">
                      Send message
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Paper>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
