import React from "react";
import { notifications } from "@mantine/notifications";
import { createCompany } from "@/services/createCompany";
import CompanyForm, { CompanyInput } from "@/components/company-form/CompanyForm";
import { useQueryClient } from "@tanstack/react-query";
import { modals } from "@mantine/modals";

const CreateCompanyModal = () => {
  const queryClient = useQueryClient();

  const handleCreate = async (values: CompanyInput) => {
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

    queryClient.invalidateQueries({ queryKey: ["getAllCompanies"] });
    modals.closeAll();

    notifications.show({
      title: "Success",
      message: "Company created successfully",
      color: "green",
    });
  };

  return <CompanyForm onSubmit={handleCreate} submitButtonLabel="Create" />;
};

export default CreateCompanyModal;
