"use client";
import React, { memo } from "react";
import { TextInput, Button, Paper, Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import { companyFormValidationSchema } from "@/validation/companyFormValidationSchema";

interface CompanyFormProps {
  initialValues?: {
    name: string;
    location: string;
    contactPerson?: string;
    tags?: string;
    website?: string;
    linkedin?: string;
  };
  onSubmit: (values: any) => void;
  submitButtonLabel?: string;
}

const CompanyForm: React.FC<CompanyFormProps> = ({
  initialValues,
  onSubmit,
  submitButtonLabel = "Submit",
}) => {
  const form = useForm({
    initialValues: {
      name: "",
      location: "",
      contactPerson: "",
      tags: "",
      website: "",
      linkedin: "",
      ...initialValues,
    },
    validate: yupResolver(companyFormValidationSchema),
  });

  return (
    <Paper radius="md" p="lg" withBorder maw={600} mx="auto">
      <Title order={3} mb="md" ta="center">
        {submitButtonLabel === "Update" ? "Edit Company" : "Create Company"}
      </Title>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack>
          <TextInput
            label="Name"
            placeholder="Company name"
            radius="sm"
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Location"
            placeholder="City, Country"
            radius="sm"
            {...form.getInputProps("location")}
          />
          <TextInput
            label="Contact Person"
            placeholder="John Doe"
            radius="sm"
            {...form.getInputProps("contactPerson")}
          />
          <TextInput
            label="Tags"
            placeholder="e.g., fintech, startup"
            radius="sm"
            {...form.getInputProps("tags")}
          />
          <TextInput
            label="Website"
            placeholder="https://example.com"
            radius="sm"
            {...form.getInputProps("website")}
          />
          <TextInput
            label="LinkedIn"
            placeholder="https://linkedin.com/company/xyz"
            radius="sm"
            {...form.getInputProps("linkedin")}
          />
          <Button type="submit" radius="sm">
            {submitButtonLabel}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default memo(CompanyForm);
