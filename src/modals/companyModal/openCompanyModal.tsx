import { modals } from "@mantine/modals";
import EditCompanyModal from "./edit-company-modal/EditCompanyModal";
import CreateCompanyModal from "./create-company-modal/CreateCompanyModal";

type modalType = "edit" | "create";

export const openCompanyModal = (type: modalType) => {
  return modals.open({
    id: "companyModal",
    title: `${type.charAt(0).toUpperCase() + type.slice(1)} Company Modal`,
    centered: true,
    size: "700px",
    styles: {
      body: { padding: "0px 20px 20px 20px" },
      header: { padding: 20 },
      title: { fontSize: 20, fontWeight: 600 },
    },
    children: type === "edit" ? <EditCompanyModal /> : <CreateCompanyModal />,
  });
};
