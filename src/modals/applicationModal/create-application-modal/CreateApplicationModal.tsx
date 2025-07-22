import React, { memo, useState } from "react";
import { notifications } from "@mantine/notifications";
import { createApplication } from "@/services/createApplication";
import { useQueryClient } from "@tanstack/react-query";
import { modals } from "@mantine/modals";
import ApplicationForm, {
  ApplicationInput,
} from "@/components/application-form/ApplicationForm";

interface IProps {
  companyId: string;
}

const CreateApplicationModal: React.FC<IProps> = ({ companyId }) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (values: ApplicationInput) => {
    setLoading(true);
    try {
      const response = await createApplication({
        ...values,
        company: companyId,
      });

      if (!response.success) {
        notifications.show({
          title: "Error",
          message: response.message || "Failed to create application",
          color: "red",
        });
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: ["getUserApplicationByCompany"],
      });

      modals.closeAll();

      notifications.show({
        title: "Success",
        message: "Application created successfully",
        color: "green",
      });
    } catch (error) {
      console.error("Unexpected error while creating application:", error);
      notifications.show({
        title: "Error",
        message: "Something went wrong. Please try again.",
        color: "red",
      });
    } finally {
      setLoading(false); // ✅ Always reset loading
    }
  };

  return (
    <ApplicationForm
      onSubmit={handleCreate}
      submitButtonLabel="Create"
      loading={loading}
    />
  );
};

export default memo(CreateApplicationModal);
