import * as Yup from "yup";

export const companyFormValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  location: Yup.string().trim().required("Location is required"),
  contactPerson: Yup.string().trim(),
  tags: Yup.string().trim(), // comma-separated string input    
  website: Yup.string().url("Enter a valid URL").nullable(),
  linkedin: Yup.string().url("Enter a valid LinkedIn URL").nullable(),
  description: Yup.string().trim(),
});
