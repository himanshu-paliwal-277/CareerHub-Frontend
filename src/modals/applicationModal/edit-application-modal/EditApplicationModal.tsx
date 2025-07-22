"use client";
import React, { memo, useState } from "react";
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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const response = await updateApplication(application._id, values);

      if (!response.success) {
        notifications.show({
          title: "Update Failed",
          message: response.message || "Failed to update application",
          color: "red",
        });
        return;
      }

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["getAllApplicationByUserId"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["getUserApplicationByCompany"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["getApplicationById"],
        }),
      ]);

      modals.closeAll();

      notifications.show({
        title: "Updated",
        message: "Application updated successfully",
        color: "green",
      });
    } catch (error) {
      console.error("Unexpected error while updating application:", error);
      notifications.show({
        title: "Error",
        message: "Something went wrong. Please try again.",
        color: "red",
      });
    } finally {
      setLoading(false); // ✅ Always reset loading state
    }
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
      loading={loading}
    />
  );
};

export default memo(EditApplicationModal);
