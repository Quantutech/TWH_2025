export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ForgotCredentials {
  email: string;
}

export interface ResetCredentials {
  token: string;
  newPassword: string;
  newPasswordConfirmation: string;
}
export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  token?: string;
  refreshToken?: string;
}

export type ResponseData<T> = { data: T; success: boolean };
export type ResponsePaginationData<T> = {
  data: {
    data: T;
    meta: {
      totalDocs: number;
      totalPages: number;
      page: number;
      limit: number;
    };
  };
  success: boolean;
};

export type ProviderGetMeResponseData = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  availableSlot: string;
  profileImageUrl: string;
  profileSlug: string;
  professionalTitle: string;
  externalAppointmentUrl: string;
  appointmentCalendarType: string;
  licenseNumber: number;
  licenseState: string;
  yearsExperience: number;
  education: string;
  bio: string;
  galleryEnabled: boolean;
  videoIntroUrl: string;
  slidingScale: boolean;
  minFee: number;
  maxFee: number;
  isEmailVerified: boolean;
  gender: string;
  isProfileComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
  subscriptionStatus: {
    status: "trial";
    expiresAt: Date;
  };
  languages: {
    id: number;
    name: string;
  }[];
  specialities: {
    id: number;
    name: string;
  }[];
  insurances: {
    id: number;
    name: string;
  }[];
  address: {
    id: number;
    providerId: number;
    phoneNumber: string;
    country: string;
    state: string;
    city: string;
    zipCode: number;
    streetAddress: string;
    lat: string;
    long: string;
    createdAt: Date;
    updatedAt: Date;
  };
  providerAvailability: {
    id: number;
    providerId: number;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  appointmentType: {
    id: number;
    name: string;
  }[];
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  xUrl: string;
};

export type ClientGetMeResponseData = {
  id: number;
  isActive: boolean;
  email: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  profileImageUrl: string;
  profileSlug: string;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  birthDate: string | Date;
  socialSecurityNumber: string;
  gender: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  address: {
    id: number;
    providerId: number;
    clientId: number;
    phoneNumber: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
    streetAddress: string;
    lat: number;
    long: number;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type ProviderListResponseData = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  profileImageUrl: string;
  profileSlug: string;
  professionalTitle: string;
  licenseNumber: number;
  licenseState: string;
  yearsExperience: number;
  education: string;
  bio: string;
  galleryEnabled: boolean;
  videoIntroUrl: string;
  state: string;
  slidingScale: boolean;
  minFee: number;
  maxFee: number;
  isEmailVerified: boolean;
  gender: string;
  reviewCount: string;
  isProfileComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
  availableSlot: string;
  avg_rating: number;
  approvedappointmentscount: number;
  city: string;
  country: string;
  address: {
    id: number;
    phone_number: string;
    country: string;
    state: string;
    city: string;
    zip_code: number;
    street_address: string;
    lat: string;
    long: string;
  };
  languages: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  specialities: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  insurances: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  }[];
  appointmentType: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    type: string;
  }[];
};

export type ProviderListParams = {
  page?: number;
  limit?: number;
  keyword?: string;
  gender?: string;
  state?: string;
  languages?: string;
  insurances?: string;
  specialties?: string;
  isAvailable?: boolean;
  sort?: number;
  lat?: number;
  long?: number;
  appointmentType?: "in-person" | "online";
  dayOfWeek?:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
};

export interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export type GetStatesResponseData = {
  id: number;
  countryId: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GetLanguagesResponseData = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GetInsurancesResponseData = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GetSpecialitiesResponseData = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CountriesResponseData = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};
export type CitiesResponseData = {
  id: number;
  name: string;
  stateId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CustomSelectOption =
  | { value: string | number; label: string }
  | undefined;

export type CustomAsyncSelectOption =
  | {
      value?: string | number;
      id?: string | number;
      label?: string;
      name?: string;
    }
  | undefined;

export type ProviderUpdateResponseData = {
  firstName: string;
  lastName: string;
  middleName: string;
  professionalTitle: string;
  licenseNumber: number;
  licenseState: string;
  yearsExperience: number;
  education: string;
  bio: string;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
  zipCode: number;
  streetAdress: string;
  specialties: number[];
  languages: number[];
  insurances: number[];
  appointmentTypes: number[];
  lat: number;
  long: number;
  workingHours: {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  }[];
};

export type ProviderUpdateforDashboardSubmitData = {
  firstName: string;
  lastName: string;
  email: string;
  gender: { value: string; label: string };
  externalAppointmentUrl?: string;
  middleName?: string;
  professionalTitle: string;
  licenseNumber: string;
  licenseState: {
    id: number;
    name: string;
    countryId: number;
    createdAt: Date;
    updatedAt: Date;
  };
  yearsExperience: string;
  education: string;
  bio: string;
  specialities: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  phoneNumber: string;
  country: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
  state: {
    id: number;
    name: string;
    countryId: number;
    createdAt: Date;
    updatedAt: Date;
  };
  city: {
    id: number;
    name: string;
    stateId: number;
    createdAt: Date;
    updatedAt: Date;
  };
  zipCode: string;
  streetAddress: string;
  appointmentCalendarType: { value: string; label: string };
  insurances: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  languages?: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  availabilityDays?: {
    value: string;
    label: string;
  }[];
  appointmentTypes?: {
    inPerson: boolean;
    video: boolean;
    phone: boolean;
    text: boolean;
  };
  appointmentDurations?: {
    "15min"?: boolean;
    "30min"?: boolean;
    "45min"?: boolean;
    "60min"?: boolean;
  };
  availabilityHoursFrom?: {
    value?: string;
    label?: string;
    disabled?: boolean;
  };
  availabilityHoursTo?: { value?: string; label?: string; disabled?: boolean };
  pricingBasedOnDurationPer15Min?: string;
  minimumFee?: string;
  MaximumFee?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  xUrl?: string;
};

export type AppointmentActiveUpcomingAction =
  | "sendReminder"
  | "viewDetails"
  | "cancelAppointment"
  | undefined;

export type AppointmentsListResponseData = {
  id: number;
  providerId: number;
  clientId: number;
  slotTime: string;
  status: "Confirmed" | "Cancelled";
  reason: string;
  insuranceId: number;
  createdAt: string;
  updatedAt: string;
  client: {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
  };
  insurance: {
    id: number;
    name: string;
  };
  appointmentType: {
    id: number;
    name: string;
    type: "online" | "in-person";
  };
  appointmentTypeId: number;
};

export type AppointmentsListParams = {
  keyword: string;
  page: number;
  limit: number;
  status: "Confirmed" | "Cancelled" | "Pasted";
};

export type ProfileManagementActiveSection =
  | "personalInfo"
  | "professionalDetails"
  | "contactInfo"
  | "sessionDetails"
  | "subscriptionPayment"
  | "socialMedia";

export type ProfileManagementActiveModal =
  | "personalInformationEdit"
  | "emailEdit"
  | "changePassword"
  | "professionalDetailsEdit"
  | "contactInformationEdit"
  | "sessionDetailsEdit"
  | "insuranceAndPaymentDetailsEdit"
  | "socialMediaEditModal"
  | undefined;

export type ProviderUpdateForDashboardParams = {
  firstName: string;
  lastName: string;
  middleName: string;
  gender: string;
  appointmentCalendarType?: string;
  externalAppointmentUrl?: string;
  professionalTitle: string;
  licenseNumber: number;
  licenseState: string;
  yearsExperience: number;
  education: string;
  bio: string;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
  zipCode: number;
  streetAddress: string;
  specialities: number[];
  languages: number[];
  insurances: number[];
  appointmentTypes: number[];
  lat: number;
  long: number;
  workingHours: {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  }[];
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  xUrl: string;
  minFee: string;
  maxFee: string;
};

export type ProviderUpdateParams = {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  gender?: string;
  professionalTitle?: string;
  licenseNumber?: number;
  licenseState?: string;
  yearsExperience?: number;
  education?: string;
  bio?: string;
  phoneNumber?: string;
  country?: string;
  state?: string;
  city?: string;
  zipCode?: number;
  streetAddress?: string;
  specialities?: number[];
  languages?: number[];
  insurances?: number[];
  appointmentTypes?: number[];
  lat?: number;
  long?: number;
  workingHours?: {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  }[];
  instagramUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  xUrl?: string;
  minFee?: string;
  maxFee?: string;
  externalAppointmentUrl?: string;
  appointmentCalendarType?: string;
};

export type ClientUpdateParams = {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  birthDate?: Date | undefined;
  socialSecurityNumber?: string;
  phoneNumber?: string;
  country?: string;
  gender?: string;
  state?: string;
  city?: string;
  zipCode?: string;
  lat?: number;
  long?: number;
};

export type ClientUpdateSubmitData = {
  firstName: string;
  middleName?: string;
  lastName: string;
  birthDate: Date;
  socialSecurityNumber: string;
  phoneNumber: string;
  gender: {
    value: string;
    label: string;
  };
  country: {
    id: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
  state: {
    id: string;
    name: string;
    countryId?: number;
    createdAt?: Date;
    updatedAt?: Date;
  };
  city: {
    id: string;
    name: string;
    stateId?: number;
    createdAt?: Date;
    updatedAt?: Date;
  };
  zipCode: string;
};

export type ProviderProfileManagementSessionDetailsFormValues = {
  languages: any[];
  appointmentTypes: {
    inPerson: boolean;
    video: boolean;
    phone: boolean;
    text: boolean;
  };
  availabilityDays: any[];
  availabilityHours?: {
    from: { value: string; label: string; disabled: boolean };
    to: { value: string; label: string; disabled: boolean };
  };
  appointmentDurations: any;
  externalAppointmentUrl: string;
  appointmentCalendarType: { value: string; label: string };
};

export type ActiveNotification =
  | "allNotifications"
  | "appointmentNotifications"
  | "supportNotifications";

export interface CreateAppointmentData {
  slotTime: string;
  providerId: number;
  insuranceId: number;
  reason: string;
  appointmentTypeId: number;
}

export type ProviderDetailActiveTab =
  | "introduction"
  | "location"
  | "services"
  | "about"
  | "media"
  | "resources";

export interface TermsSection {
  id: string;
  title: string;
  href: string;
  question?: string;
  answer?: string;
  content: {
    question: string;
    answer: string;
  }[];
}
