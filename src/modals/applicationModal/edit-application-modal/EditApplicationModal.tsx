"use client";
import React, { memo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Center, Loader } from "@mantine/core";
import { modals } from "@mantine/modals";
import { updateApplication } from "@/services/updateApplication";
import ApplicationForm, {
  ApplicationInput,
} from "@/components/application-form/ApplicationForm";
import { getApplicationById } from "@/services/getApplicationById";

interface IProps {
  id: string;
}

const EditApplicationModal: React.FC<IProps> = ({ id }) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["getApplicationById", id],
    queryFn: () => getApplicationById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Center h="40vh" w="100%">
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

    queryClient.invalidateQueries({
      queryKey: ["getUserApplicationByCompany"],
    });
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

export default memo(EditApplicationModal);
