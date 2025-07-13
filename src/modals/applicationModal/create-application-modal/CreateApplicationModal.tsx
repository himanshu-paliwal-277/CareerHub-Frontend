import React from "react";
import { notifications } from "@mantine/notifications";
import { createApplication } from "@/services/createApplication";
import { useQueryClient } from "@tanstack/react-query";
import { modals } from "@mantine/modals";
import ApplicationForm, {
  ApplicationInput,
} from "@/components/application-form/ApplicationForm";

interface CreateApplicationModalProps {
  companyId: string;
}

const CreateApplicationModal: React.FC<CreateApplicationModalProps> = ({
  companyId,
}) => {
  const queryClient = useQueryClient();

  const handleCreate = async (values: ApplicationInput) => {
    console.log("companyId", companyId);
    const response = await createApplication({ ...values, company: companyId });

    if (!response.success) {
      notifications.show({
        title: "Error",
        message: response.message || "Failed to create application",
        color: "red",
      });
      return;
    }

    queryClient.invalidateQueries({
      queryKey: ["getUserApplicationByCompany"],
    });
    modals.closeAll();

    notifications.show({
      title: "Success",
      message: "Application created successfully",
      color: "green",
    });
  };

  return <ApplicationForm onSubmit={handleCreate} submitButtonLabel="Create" />;
};

export default CreateApplicationModal;
