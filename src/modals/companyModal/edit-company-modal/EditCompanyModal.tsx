"use client";
import React, { memo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCompanyById } from "@/services/getCompanyById";
import { useParams } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { Center, Loader } from "@mantine/core";
import { updateCompany } from "@/services/updateCompany";
import CompanyForm, {
  CompanyInput,
} from "@/components/company-form/CompanyForm";
import { modals } from "@mantine/modals";

const EditCompanyModal: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["getCompanyById"],
    queryFn: () => getCompanyById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Center h="70vh" w="100%">
        <Loader type="dots" />
      </Center>
    );
  }

  const company = data?.data;

  const handleUpdate = async (values: CompanyInput) => {
    setLoading(true);
    try {
      const response = await updateCompany(id, values);

      if (!response.success) {
        notifications.show({
          title: "Update Failed",
          message: response.message || "Failed to update company",
          color: "red",
        });
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["getCompanyById"] });
      modals.closeAll();

      notifications.show({
        title: "Updated",
        message: "Company updated successfully",
        color: "green",
      });
    } catch (error) {
      console.error("Unexpected error while updating company:", error);
      notifications.show({
        title: "Error",
        message: "Something went wrong. Please try again.",
        color: "red",
      });
    } finally {
      setLoading(false); // ✅ Ensures loading state is reset
    }
  };

  return (
    <CompanyForm
      initialValues={company}
      onSubmit={handleUpdate}
      submitButtonLabel="Update"
      loading={loading}
    />
  );
};

export default memo(EditCompanyModal);
