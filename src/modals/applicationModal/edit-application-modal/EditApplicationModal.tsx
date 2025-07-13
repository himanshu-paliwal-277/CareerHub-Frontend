"use client";
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { Center, Loader } from "@mantine/core";
import { modals } from "@mantine/modals";
import { getUserApplicationByCompany } from "@/services/getUserApplicationByCompany";
import { updateApplication } from "@/services/updateApplication";
import ApplicationForm, {
  ApplicationInput,
} from "@/components/application-form/ApplicationForm";

const EditApplicationModal = () => {
  const params = useParams();
  const id = params?.id as string;
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["getUserApplicationByCompany", id],
    queryFn: () => getUserApplicationByCompany(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Center h="70vh" w="100%">
        <Loader type="dots" />
      </Center>
    );
  }

  const application = data?.data;

  const handleUpdate = async (values: ApplicationInput) => {
    const response = await updateApplication(application._id, values);

    if (!response.success) {
      notifications.show({
        title: "Update Failed",
        message: response.message || "Failed to update application",
        color: "red",
      });
      return;
    }

    queryClient.invalidateQueries({ queryKey: ["getUserApplicationByCompany"] });
    modals.closeAll();

    notifications.show({
      title: "Updated",
      message: "Application updated successfully",
      color: "green",
    });
  };

  return (
    <ApplicationForm
      initialValues={{
        status: application?.status || "Not Applied",
        applicationDate: application?.applicationDate || "",
        notes: application?.notes || "",
      }}
      onSubmit={handleUpdate}
      submitButtonLabel="Update"
    />
  );
};

export default EditApplicationModal;
