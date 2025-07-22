"use client";
import React, { memo } from "react";
import {
  TextInput,
  Button,
  Stack,
  Box,
  MultiSelect,
  Select,
  Collapse,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import { companyFormValidationSchema } from "@/validation/companyFormValidationSchema";
import { useDisclosure } from "@mantine/hooks";

export type CompanyInput = {
  name: string;
  location: string;
  companySize: string;
  contactInfo: {
    contactPerson?: string;
    mobile: string;
    email: string;
    linkedIn: string;
  };
  tags?: string[];
  website?: string;
  linkedin?: string;
};

interface CompanyFormProps {
  initialValues?: CompanyInput;
  onSubmit: (values: CompanyInput) => void;
  submitButtonLabel?: string;
  loading?: boolean;
}

const CompanyForm: React.FC<CompanyFormProps> = ({
  initialValues,
  onSubmit,
  submitButtonLabel = "Submit",
  loading = false,
}) => {
  const [contactOpen, { toggle }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      name: "",
      location: "",
      companySize: "",
      contactInfo: {
        contactPerson: "",
        mobile: "",
        email: "",
        linkedIn: "",
      },
      tags: [],
      website: "",
      linkedin: "",
      ...initialValues,
    },
    validate: yupResolver(companyFormValidationSchema),
  });

  return (
    <Box>
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
          <Select
            label="Company Size"
            placeholder="Select company size"
            data={["1-10", "11-50", "51-200", "201-500", "500+"]}
            radius="sm"
            {...form.getInputProps("companySize")}
          />
          <Box>
            <Button
              variant="light"
              color="blue"
              radius="sm"
              size="xs"
              onClick={toggle}
              mb="xs"
            >
              {contactOpen ? "Hide Contact Info" : "Show Contact Info"}
            </Button>

            <Collapse in={contactOpen}>
              <Box>
                <TextInput
                  label="Contact Person"
                  placeholder="John Doe (HR)"
                  radius="sm"
                  {...form.getInputProps("contactInfo.contactPerson")}
                />
                <TextInput
                  label="Mobile"
                  placeholder="+91 9876543210"
                  radius="sm"
                  {...form.getInputProps("contactInfo.mobile")}
                  mb="xs"
                />
                <TextInput
                  label="Email"
                  placeholder="contact@example.com"
                  radius="sm"
                  {...form.getInputProps("contactInfo.email")}
                  mb="xs"
                />
                <TextInput
                  label="LinkedIn Profile"
                  placeholder="https://linkedin.com/in/username"
                  radius="sm"
                  {...form.getInputProps("contactInfo.linkedIn")}
                />
              </Box>
            </Collapse>
          </Box>

          <MultiSelect
            label="Tags"
            placeholder="Select tags"
            data={[
              "FRONTEND",
              "BACKEND",
              "FULL STACK",
              "MERN",
              "SOFTWARE DEVELOPER",
            ]}
            mb="md"
            clearable
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
          <Button loading={loading} type="submit" radius="sm" w="100px">
            {submitButtonLabel}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default memo(CompanyForm);
