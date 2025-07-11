import React from "react";
import { notifications } from "@mantine/notifications";
import { createCompany } from "@/services/createCompany";
import CompanyForm from "@/components/company-form/CompanyForm";

const CreateCompanyModal = () => {
  const handleCreate = async (values: any) => {
    const dataToSend = {
      ...values,
      tags: values.tags?.split(",").map((tag: string) => tag.trim()), // convert to array
    };

    const response = await createCompany(dataToSend);

    if (!response.success) {
      notifications.show({
        title: "Error",
        message: response.message || "Failed to create company",
        color: "red",
      });
      return;
    }

    notifications.show({
      title: "Success",
      message: "Company created successfully",
      color: "green",
    });
  };

  return <CompanyForm onSubmit={handleCreate} submitButtonLabel="Create" />;
};

export default CreateCompanyModal;
