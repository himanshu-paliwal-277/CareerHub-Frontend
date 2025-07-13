import * as Yup from "yup";

export const applicationFormValidationSchema = Yup.object().shape({
  status: Yup.string().trim().required("Status is required"),
  applicationDate: Yup.date().required("Application date is required"),
  notes: Yup.string().trim(),
});
