"use client";
import React from "react";
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

const EditCompanyModal = () => {
  const params = useParams();
  const id = params?.id as string;
  const queryClient = useQueryClient();

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
    const updated = {
      ...values,
      tags: values.tags?.split(",").map((tag: string) => tag.trim()),
    };

    const response = await updateCompany(id, updated);

    if (!response.success) {
      notifications.show({
        title: "Update Failed",
        message: response.message || "Failed to update company",
        color: "red",
      });
      return;
    }

    queryClient.invalidateQueries({ queryKey: ["getCompanyById"] });
    modals.closeAll();

    notifications.show({
      title: "Updated",
      message: "Company updated successfully",
      color: "green",
    });
  };

  return (
    <CompanyForm
      initialValues={{
        ...company,
        tags: company.tags?.join(", "),
      }}
      onSubmit={handleUpdate}
      submitButtonLabel="Update"
    />
  );
};

export default EditCompanyModal;
