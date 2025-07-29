"use client";
import React, { memo } from "react";
import { Button, Stack, Box, Textarea, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import { applicationFormValidationSchema } from "@/validation/applicationFormValidationSchema";
import { DateInput } from "@mantine/dates";

type ApplicationStatus =
  | "Not Applied"
  | "Applied"
  | "Shortlisted"
  | "Interview"
  | "Offer"
  | "Rejected";

export type ApplicationInput = {
  status: ApplicationStatus | undefined;
  applicationDate: Date | null;
  notes: string;
  company?: string; // Optional, used when creating a new application
};

interface ApplicationFormProps {
  initialValues?: ApplicationInput;
  onSubmit: (values: ApplicationInput) => void;
  submitButtonLabel?: string;
  loading?: boolean;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  initialValues,
  onSubmit,
  submitButtonLabel = "Submit",
  loading = false,
}) => {
  const form = useForm({
    initialValues: {
      status: initialValues?.status,
      applicationDate: initialValues?.applicationDate ?? null,
      notes: initialValues?.notes ?? "",
    },
    validate: yupResolver(applicationFormValidationSchema),
  });

  const handleSubmit = (values: typeof form.values) => {
    // Ensure status is cast to ApplicationInput["status"]
    onSubmit(values);
  };

  return (
    <Box>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Select
            label="Status"
            placeholder="Application status"
            data={[
              "Not Applied",
              "Applied",
              "Shortlisted",
              "Interview",
              "Offer",
              "Rejected",
              "Cleared",
            ]}
            {...form.getInputProps("status")}
          />
          <DateInput
            label="Application Date"
            placeholder="Application Date"
            maxDate={new Date()} // disables future dates
            {...form.getInputProps("applicationDate")}
          />
          <Textarea
            label="Notes"
            placeholder="Additional notes"
            radius="sm"
            {...form.getInputProps("notes")}
          />
          <Button loading={loading} type="submit" radius="sm" w="100px">
            {submitButtonLabel}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default memo(ApplicationForm);
