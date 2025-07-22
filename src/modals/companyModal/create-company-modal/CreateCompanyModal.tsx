import React, { memo, useState } from "react";
import { notifications } from "@mantine/notifications";
import { createCompany } from "@/services/createCompany";
import CompanyForm, {
  CompanyInput,
} from "@/components/company-form/CompanyForm";
import { useQueryClient } from "@tanstack/react-query";
import { modals } from "@mantine/modals";

const CreateCompanyModal: React.FC = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (values: CompanyInput) => {
    setLoading(true);
    try {
      const response = await createCompany(values);

      if (!response.success) {
        notifications.show({
          title: "Error",
          message: response.message || "Failed to create company",
          color: "red",
        });
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["getAllCompanies"] });
      modals.closeAll();

      notifications.show({
        title: "Success",
        message: "Company created successfully",
        color: "green",
      });
    } catch (error) {
      console.error("Unexpected error while creating company:", error);
      notifications.show({
        title: "Error",
        message: "Something went wrong. Please try again.",
        color: "red",
      });
    } finally {
      setLoading(false); // ✅ Always runs
    }
  };

  return (
    <CompanyForm
      onSubmit={handleCreate}
      submitButtonLabel="Create"
      loading={loading}
    />
  );
};

export default memo(CreateCompanyModal);
