import { insurance } from "@repo/ui/constants/constant";
import { ProviderUpdateforDashboardSubmitData } from "@repo/ui/utils/type";
import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9_]).{8,}$/,
      "Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number and a special character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const validationSchemaForgotPassword = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

export const validationSchemaResetPassword = yup.object().shape({
  newPassword: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9_]).{8,}$/,
      "Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number and a special character"
    ),
  newPasswordConfirmation: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

const prependHttps = (value: string) => {
  if (!value) return value;
  return value.startsWith("http://") || value.startsWith("https://")
    ? value
    : `https://${value}`;
};

export const providerUpdateValidationSchema =
  (): yup.ObjectSchema<ProviderUpdateforDashboardSubmitData> => {
    return yup.object({
      firstName: yup.string().required("Required"),
      lastName: yup.string().required("Required"),
      email: yup.string().email("Invalid Email").required("Required"),
      middleName: yup.string().optional(),
      professionalTitle: yup.string().required("Required"),
      licenseNumber: yup.string().required("Required"),
      licenseState: yup
        .object({
          id: yup.number().required(),
          name: yup.string().required(),
          countryId: yup.number().required(),
          createdAt: yup.date().required(),
          updatedAt: yup.date().required(),
        })
        .required("Required"),
      yearsExperience: yup.string().required("Required"),
      education: yup
        .string()
        .required("Required")
        .max(500, "Maximum 500 characters allowed"),
      bio: yup
        .string()
        .required("Required")
        .max(5000, "Maximum 500 characters allowed"),
      specialities: yup
        .array()
        .of(
          yup.object({
            id: yup.number().required(),
            name: yup.string().required(),
            createdAt: yup.date().required(),
            updatedAt: yup.date().required(),
          })
        )
        .min(1, "Required")
        .required("Required"),
      phoneNumber: yup.string().required("Required"),
      country: yup
        .object({
          id: yup.number().required(),
          name: yup.string().required(),
          createdAt: yup.date().required(),
          updatedAt: yup.date().required(),
        })
        .required("Required"),
      state: yup
        .object({
          id: yup.number().required(),
          name: yup.string().required(),
          countryId: yup.number().required(),
          createdAt: yup.date().required(),
          updatedAt: yup.date().required(),
        })
        .required("Required"),
      city: yup
        .object({
          id: yup.number().required(),
          name: yup.string().required(),
          stateId: yup.number().required(),
          createdAt: yup.date().required(),
          updatedAt: yup.date().required(),
        })
        .required("Required"),
      zipCode: yup
        .string()
        .required("Required")
        .matches(/^\d{5}$/, "Zip code must be exactly 5 digits"),
      insurances: yup
        .array()
        .of(
          yup.object({
            id: yup.number().required(),
            name: yup.string().required(),
            createdAt: yup.date().required(),
            updatedAt: yup.date().required(),
          })
        )
        .required(),
      streetAddress: yup.string().required("Required"),
      gender: yup
        .object({
          value: yup.string().required(),
          label: yup.string().required(),
        })
        .required("Required"),

      externalAppointmentUrl: yup
        .string()
        .optional()
        .test(
          "external-appointment-url-required",
          "Invalid Url",
          function (value) {
            const { hasExternalAppointment } = this.options.context || {};
            if (hasExternalAppointment) {
              return !!value && /^(https?:\/\/)/.test(value);
            }
            return true;
          }
        ),

      appointmentCalendarType: yup
        .object({
          value: yup.string().required(),
          label: yup.string().required(),
        })
        .required("Required"),

      languages: yup
        .array()
        .of(
          yup.object({
            id: yup.number().required(),
            name: yup.string().required(),
            createdAt: yup.date().required(),
            updatedAt: yup.date().required(),
          })
        )
        .optional()
        .test("languages-required", "Required", function (value) {
          const { hasExternalAppointment } = this.options.context || {};
          if (!hasExternalAppointment) {
            return Array.isArray(value) && value.length > 0;
          }
          return true;
        }),

      availabilityDays: yup
        .array()
        .of(
          yup.object({
            value: yup.string().required(),
            label: yup.string().required(),
          })
        )
        .optional()
        .test("availability-days-required", "Required", function (value) {
          const { hasExternalAppointment } = this.options.context || {};
          if (!hasExternalAppointment) {
            return Array.isArray(value) && value.length > 0;
          }
          return true;
        }),

      appointmentTypes: yup
        .object({
          inPerson: yup.boolean().default(false),
          video: yup.boolean().default(false),
          phone: yup.boolean().default(false),
          text: yup.boolean().default(false),
        })
        .optional()
        .test(
          "at-least-one-selected",
          "You must select at least one option",
          function (value) {
            const { hasExternalAppointment } = this.options.context || {};
            if (!hasExternalAppointment) {
              return Object.values(value || {}).some(Boolean);
            }
            return true;
          }
        ),

      appointmentDurations: yup
        .object({
          "15min": yup.boolean().optional(),
          "30min": yup.boolean().optional(),
          "45min": yup.boolean().optional(),
          "60min": yup.boolean().optional(),
        })
        .optional(),

      availabilityHoursFrom: yup
        .object({
          value: yup.string(),
          label: yup.string(),
          disabled: yup.boolean().optional(),
        })
        .optional()
        .test("to-required-if-not-external", "Required", function (value) {
          const { hasExternalAppointment } = this.options.context || {};
          if (!hasExternalAppointment) {
            return !!value && !!value.value;
          }
          return true;
        }),

      availabilityHoursTo: yup
        .object({
          value: yup.string(),
          label: yup.string(),
          disabled: yup.boolean().optional(),
        })
        .optional()
        .test("to-required-if-not-external", "Required", function (value) {
          const { hasExternalAppointment } = this.options.context || {};
          if (!hasExternalAppointment) {
            return !!value?.value;
          }
          return true;
        }),

      pricingBasedOnDurationPer15Min: yup.string().optional(),
      minimumFee: yup.string().optional(),
      MaximumFee: yup.string().optional(),
      instagramUrl: yup
        .string()
        .optional()
        .transform(prependHttps)
        .url("Invalid URL"),
      facebookUrl: yup
        .string()
        .optional()
        .transform(prependHttps)
        .url("Invalid URL"),
      youtubeUrl: yup
        .string()
        .optional()
        .transform(prependHttps)
        .url("Invalid URL"),
      xUrl: yup.string().optional().transform(prependHttps).url("Invalid URL"),
    });
  };
