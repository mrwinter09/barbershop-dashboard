/** @format */

import { Formik, Form } from "formik";
import {
  TextInput,
  Textarea,
  Group,
  Button,
  Stack,
  Select,
} from "@mantine/core";
import { appointmentSchema } from "../validation/appointmentSchema";
import type { NewAppointment } from "../api/useCreateAppointment";
import {
  serviceOptions,
  barberOptions,
} from "../../../features/appointments/constants";

interface AppointmentFormProps {
  initialValues?: NewAppointment;
  onSubmit: (values: NewAppointment) => void | Promise<void>;
  isSubmitting?: boolean;
}

const defaultValues: NewAppointment = {
  clientName: "",
  service: "",
  barberName: "",
  date: "",
  time: "",
  notes: "",
};

export default function AppointmentForm({
  initialValues = defaultValues,
  onSubmit,
  isSubmitting,
}: AppointmentFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={appointmentSchema}
      onSubmit={onSubmit}>
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
      }) => (
        <Form>
          <Stack gap="sm">
            <TextInput
              label="Client name"
              name="clientName"
              value={values.clientName}
              onChange={handleChange}
              error={touched.clientName && errors.clientName}
            />
            <Select
              label="Service"
              data={serviceOptions}
              name="service"
              value={values.service}
              onChange={(value) => setFieldValue("service", value || "")}
              onBlur={handleBlur}
              error={touched.service && errors.service}
              mb="sm"
            />
            <Select
              label="Barber"
              data={barberOptions}
              name="barberName"
              value={values.barberName}
              onChange={(value) => setFieldValue("barberName", value || "")}
              onBlur={handleBlur}
              error={touched.barberName && errors.barberName}
              mb="sm"
            />
            <Group grow>
              <TextInput
                label="Date"
                name="date"
                type="date"
                value={values.date}
                onChange={handleChange}
                error={touched.date && errors.date}
              />
              <TextInput
                label="Time"
                name="time"
                type="time"
                value={values.time}
                onChange={handleChange}
                error={touched.time && errors.time}
              />
            </Group>
            <Textarea
              label="Notes"
              name="notes"
              value={values.notes ?? ""}
              onChange={handleChange}
              minRows={2}
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit" loading={isSubmitting}>
                Save appointment
              </Button>
            </Group>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
