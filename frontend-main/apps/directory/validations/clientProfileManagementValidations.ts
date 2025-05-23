import * as yup from "yup";

export const personalInformationEditModalValidation = yup.object().shape({
  firstName: yup.string().required("Required"),
  middleName: yup.string().optional(),
  lastName: yup.string().required("Required"),
  birthDate: yup.date().required("Required"),
  socialSecurityNumber: yup
    .string()
    .matches(/^\d{3}-\d{2}-\d{4}$/, "SSN must be in the format XXX-XX-XXXX")
    .required("Required"),
  gender: yup
    .object({
      value: yup.string().required("Required"),
      label: yup.string().required("Required"),
    })
    .required("Required"),
  country: yup
    .object({
      id: yup.string().required("Required"),
      name: yup.string().required("Required"),
      createdAt: yup.date().optional(),
      updatedAt: yup.date().optional(),
    })
    .required("Required"),
  state: yup
    .object({
      id: yup.string().required("Required"),
      name: yup.string().required("Required"),
      countryId: yup.number().optional(),
      createdAt: yup.date().optional(),
      updatedAt: yup.date().optional(),
    })
    .required("Required"),
  city: yup
    .object({
      id: yup.string().required("Required"),
      name: yup.string().required("Required"),
      stateId: yup.number().optional(),
      createdAt: yup.date().optional(),
      updatedAt: yup.date().optional(),
    })
    .required("Required"),
  zipCode: yup
    .string()
    .matches(/^\d{5}$/, "Zip code must be 5 digits")
    .required("Required"),
  phoneNumber: yup.string().required("Required"),
});
