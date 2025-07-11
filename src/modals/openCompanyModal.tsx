import { modals } from "@mantine/modals";
import EditCompanyModal from "./edit-company-modal/EditCompanyModal";
import CreateCompanyModal from "./create-company-modal/CreateCompanyModal";

type modalType = "edit" | "create";

export const openCompanyModal = (type: modalType) => {
  return modals.open({
    title: `${type} company modal`,
    centered: true,
    size: "xl",
    children: type === "edit" ? <EditCompanyModal /> : <CreateCompanyModal />,
  });
};
