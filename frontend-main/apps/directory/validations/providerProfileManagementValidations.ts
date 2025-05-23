import * as yup from "yup";

export const personalInformationEditModalValidation = yup.object().shape({
  firstName: yup.string().required("Required"),
  middleName: yup.string().nullable(),
  lastName: yup.string().required("Required"),
});

export const SocialMediaEditModalValidation = yup.object().shape({
  instagramUrl: yup
    .string()
    .nullable()
    .notRequired()
    .matches(
      /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
      "Invalid URL"
    ),
  facebookUrl: yup
    .string()
    .nullable()
    .notRequired()
    .matches(
      /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
      "Invalid URL"
    ),
  youtubeUrl: yup
    .string()
    .nullable()
    .notRequired()
    .matches(
      /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
      "Invalid URL"
    ),
  xUrl: yup
    .string()
    .nullable()
    .notRequired()
    .matches(
      /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
      "Invalid URL"
    ),
});

export const emailEditModalValidation = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
});

export const changePasswordModalValidation = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9_]).{8,}$/,
      "Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number and a special character"
    ),
  newPassword: yup
    .string()
    .required("Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9_]).{8,}$/,
      "Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number and a special character"
    ),
  repeatNewPassword: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

export const professionalDetailsModalValidation = yup.object().shape({
  professionalTitle: yup.string().required("Required"),
  licenseNumber: yup.number().required("Required"),
  licenseState: yup
    .object({
      id: yup.string().required("Required"),
      name: yup.string().required("Required"),
    })
    .required("Required"),
  yearsExperience: yup.number().required("Required"),
  education: yup.string().required("Required"),
  bio: yup.string().required("Required"),
  specialities: yup.array().min(1, "Required").required("Required"),
});

export const contactInformationEdditModalValidation = yup.object().shape({
  phoneNumber: yup.string().required("Required"),
  country: yup
    .object({
      id: yup.string().required("Required"),
      name: yup.string().required("Required"),
    })
    .required("Required"),
  state: yup
    .object({
      id: yup.string().required("Required"),
      name: yup.string().required("Required"),
    })
    .required("Required"),
  city: yup
    .object({
      id: yup.string().required("Required"),
      name: yup.string().required("Required"),
    })
    .required("Required"),
  streetAddress: yup.string().required("Required"),
  zipCode: yup.string().required("Required"),
});

export const sessionDetailsEditModalValidation = yup.object().shape({
  languages: yup.array().min(1, "Required").required("Required"),
  appointmentTypes: yup
    .object({
      inPerson: yup.boolean().default(false),
      video: yup.boolean().default(false),
      phone: yup.boolean().default(false),
      text: yup.boolean().default(false),
    })
    .test(
      "at-least-one-selected",
      "You must select at least one option",
      (value) => Object.values(value || {}).some(Boolean)
    ),
  availabilityDays: yup.array().min(1, "Required").required("Required"),
  appointmentDurations: yup
    .object({
      "15min": yup.boolean().notRequired(),
      "30min": yup.boolean().notRequired(),
      "45min": yup.boolean().notRequired(),
      "60min": yup.boolean().notRequired(),
    })
    .notRequired(),
  externalAppointmentUrl: yup
    .string()
    .nullable()
    .notRequired()
    .matches(
      /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
      "Invalid URL"
    ),
});

export const insuranceAndPaymnetDetailsEditModalValidation = yup
  .object()
  .shape({
    insurances: yup.array().min(1, "Required").required("Required"),
    paymentMethodsAccepted: yup.array().nullable(),
    pricingBasedOnDurationPer15Min: yup.number().required("Required"),
    minimumFee: yup.number().required("Required"),
    MaximumFee: yup.number().required("Required"),
  });
