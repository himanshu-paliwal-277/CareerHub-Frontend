import * as Yup from "yup";

export const companyFormValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  location: Yup.string().trim().required("Location is required"),
  companySize: Yup.string().trim().required("Company Size is required"),
  contactInfo: Yup.object().shape({
    contactPerson: Yup.string().trim().optional(),
    mobile: Yup.string()
      .trim()
      .nullable()
      .notRequired()
      .test(
        "is-valid-mobile",
        "Mobile number must be exactly 10 digits",
        function (value) {
          if (!value) return true; // ✅ allow empty, null, or undefined
          return /^\d{10}$/.test(value);
        }
      ),
    email: Yup.string().trim().email("Invalid email address").optional(),
    linkedIn: Yup.string().trim().url("Enter a valid LinkedIn URL").optional(),
  }),
  tags: Yup.array().min(1, "At least one tag is required"),
  website: Yup.string().url("Enter a valid URL").required("Company website is required"),
  linkedin: Yup.string().url("Enter a valid LinkedIn URL").required("Company linkedin profile required"),
});
