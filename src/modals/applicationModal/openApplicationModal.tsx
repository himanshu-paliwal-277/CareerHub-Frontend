import { modals } from "@mantine/modals";
import EditApplicationModal from "./edit-application-modal/EditApplicationModal";
import CreateApplicationModal from "./create-application-modal/CreateApplicationModal";

type modalType = "edit" | "create";

export const openApplicationModal = (type: modalType, companyId?: string) => {
  console.log("Opening application modal of type:", type, "for companyId:", companyId);
  return modals.open({
    id: "applicationModal",
    title: `${type.charAt(0).toUpperCase() + type.slice(1)} Application Modal`,
    centered: true,
    size: "50%",
    styles: {
      body: { padding: "0px 20px 20px 20px" },
      header: { padding: 20 },
      title: { fontSize: 20, fontWeight: 600 },
    },
    children:
      type === "edit" ? (
        <EditApplicationModal />
      ) : (
        <CreateApplicationModal companyId={companyId || ""} />
      ),
  });
};
