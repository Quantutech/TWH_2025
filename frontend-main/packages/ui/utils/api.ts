import axios from "axios";
import { getCookie, removeCookie, setCookie } from "./storage";
import {
  AppointmentsListParams,
  AppointmentsListResponseData,
  CitiesResponseData,
  ClientGetMeResponseData,
  ClientUpdateParams,
  ContactData,
  CountriesResponseData,
  CreateAppointmentData,
  ForgotCredentials,
  GetInsurancesResponseData,
  GetLanguagesResponseData,
  GetSpecialitiesResponseData,
  GetStatesResponseData,
  LoginCredentials,
  LoginResponse,
  ProviderGetMeResponseData,
  ProviderListParams,
  ProviderListResponseData,
  ProviderUpdateForDashboardParams,
  ProviderUpdateParams,
  ProviderUpdateResponseData,
  RegisterCredentials,
  ResetCredentials,
  ResponseData,
  ResponsePaginationData,
} from "./type";
import { urls } from "./url";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const __DEV__ = process.env.NEXT_PUBLIC_ENV === "dev";

const axiosInstance = axios.create({
  baseURL,
  // withCredentials: true,
  timeout: 60000,
});

axiosInstance.interceptors.request.use((config) => {
  // const language = localStorage.getItem("locale") ?? "de";
  // if (!config.headers["Language"]) {
  //   config.headers["Language"] = language;
  // }
  if (!config.headers.Accept) {
    config.headers.Accept = "application/json";
  }
  if (!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json";
  }
  const token = getCookie("token");
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response) {
      if (error.response.status === 401) {
        try {
          const refreshToken = getCookie("refreshToken") ?? "";
          const refreshTokenResponse = await refreshTokenAsClient(refreshToken);
          setCookie("token", refreshTokenResponse?.data.token);
          setCookie("refreshToken", refreshTokenResponse?.data?.refreshToken);
        } catch (error) {
          removeCookie("token");
          removeCookie("refreshToken");
          removeCookie("role");
          window.location.href = "/provider-sign-in";
        }
      }
      if (!__DEV__ && error.response.status === 500) {
        throw undefined;
      } else {
        throw error.response.data;
      }
    }
    if (!__DEV__) {
      throw undefined;
    } else {
      throw error;
    }
  }
);

export default axiosInstance;

export async function loginAsClient(
  credentials: LoginCredentials
): Promise<ResponseData<LoginResponse>> {
  const { data } = await axiosInstance.post<ResponseData<LoginResponse>>(
    urls.clientLogin,
    credentials
  );
  return data;
}

export async function forgotPasswordClient(
  credentials: ForgotCredentials
): Promise<ResponseData<LoginResponse>> {
  const { data } = await axiosInstance.post<ResponseData<LoginResponse>>(
    urls.clientForgotPassword,
    credentials
  );
  return data;
}

export async function resetPasswordClient(
  credentials: ResetCredentials
): Promise<ResponseData<LoginResponse>> {
  const { data } = await axiosInstance.post<ResponseData<LoginResponse>>(
    urls.clientResetPassword,
    credentials
  );
  return data;
}
export async function forgotPasswordProvider(
  credentials: ForgotCredentials
): Promise<ResponseData<LoginResponse>> {
  const { data } = await axiosInstance.post<ResponseData<LoginResponse>>(
    urls.providerForgotPassword,
    credentials
  );
  return data;
}

export async function resetPasswordProvider(
  credentials: ResetCredentials
): Promise<ResponseData<LoginResponse>> {
  const { data } = await axiosInstance.post<ResponseData<LoginResponse>>(
    urls.providerResetPassword,
    credentials
  );
  return data;
}

export async function loginAsProvider(
  credentials: LoginCredentials
): Promise<ResponseData<LoginResponse>> {
  const { data } = await axiosInstance.post<ResponseData<LoginResponse>>(
    urls.providerLogin,
    credentials
  );
  return data;
}

export async function loginAsAdmin(
  credentials: LoginCredentials
): Promise<ResponseData<LoginResponse>> {
  const { data } = await axiosInstance.post<ResponseData<LoginResponse>>(
    urls.adminLogin,
    credentials
  );
  return data;
}

export async function registerAsProvider(
  credentials: RegisterCredentials
): Promise<RegisterCredentials> {
  const { data } = await axiosInstance.post<RegisterCredentials>(
    urls.providerRegister,
    credentials
  );
  return data;
}
export async function registerAsClient(
  credentials: RegisterCredentials
): Promise<RegisterCredentials> {
  const { data } = await axiosInstance.post<RegisterCredentials>(
    urls.clientRegister,
    credentials
  );
  return data;
}

export async function refreshTokenAsClient(refreshToken: string): Promise<{
  data: { token: string; refreshToken: string };
  success: boolean;
}> {
  const { data } = await axiosInstance.post<{
    data: { token: string; refreshToken: string };
    success: boolean;
  }>(urls.clientRefreshToken, refreshToken);
  return data;
}

export async function providerGetMe(): Promise<
  ResponseData<ProviderGetMeResponseData> | { data: undefined; success: false }
> {
  const role = JSON.parse(getCookie("role") as string);

  if (role === "client" || role === "admin") {
    return { data: undefined, success: false };
  }
  const { data } = await axiosInstance.get<
    ResponseData<ProviderGetMeResponseData>
  >(urls.providerGetMe);
  return data;
}

export async function clientGetMe(): Promise<
  ResponseData<ClientGetMeResponseData> | { data: undefined; success: false }
> {
  const role = JSON.parse(getCookie("role") as string);
  if (role === "provider" || role === "admin") {
    return { data: undefined, success: false };
  }

  const { data } = await axiosInstance.get<
    ResponseData<ClientGetMeResponseData>
  >(urls.clientGetMe);
  return data;
}

export const providerUpdateForDashboard = async (
  params: ProviderUpdateForDashboardParams
): Promise<ResponseData<ProviderUpdateResponseData>> => {
  const { data } = await axiosInstance.post<
    ResponseData<ProviderUpdateResponseData>
  >(urls.providerUpdateForDashboard, { ...params });

  return data;
};

export async function adminGetMe(): Promise<
  ResponseData<ClientGetMeResponseData> | { data: undefined; success: false }
> {
  const role = JSON.parse(getCookie("role") as string);
  if (role === "provider" || role === "client") {
    return { data: undefined, success: false };
  }

  const { data } = await axiosInstance.get<
    ResponseData<ClientGetMeResponseData>
  >(urls.adminGetMe);
  return data;
}

export const providerUpdate = async (
  params: ProviderUpdateParams
): Promise<ResponseData<ProviderUpdateResponseData>> => {
  const { data } = await axiosInstance.post<
    ResponseData<ProviderUpdateResponseData>
  >(urls.providerUpdate, { ...params });
  return data;
};

export const clientUpdate = async (
  params: ClientUpdateParams
): Promise<ResponseData<unknown>> => {
  const { data } = await axiosInstance.post<ResponseData<unknown>>(
    urls.clientUpdate,
    { ...params }
  );
  return data;
};

export async function getProviderList(
  params: ProviderListParams
): Promise<ResponsePaginationData<ProviderListResponseData[]>> {
  const cleanedParams: Record<string, string | number | boolean> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      !(typeof value === "string" && value.trim() === "")
    ) {
      cleanedParams[key] = value;
    }
  });

  const { data } = await axiosInstance.get<
    ResponsePaginationData<ProviderListResponseData[]>
  >(urls.providerList, { params: cleanedParams });
  return data;
}

export async function sendContactRequest(
  contactData: ContactData
): Promise<ContactData> {
  const { data } = await axiosInstance.post<ContactData>(
    urls.contactUs,
    contactData
  );
  return data;
}

export async function getStates(
  keyword = "",
  page = 1,
  limit = 20,
  countryId?: number
): Promise<ResponsePaginationData<GetStatesResponseData[]>> {
  const { data } = await axiosInstance.get<
    ResponsePaginationData<GetStatesResponseData[]>
  >(urls.states, {
    params: {
      keyword,
      page,
      limit,
      countryId,
    },
  });
  return data;
}
export async function getCities(
  keyword = "",
  page = 1,
  limit = 20,
  stateId?: number
): Promise<ResponsePaginationData<CitiesResponseData[]>> {
  const { data } = await axiosInstance.get<
    ResponsePaginationData<CitiesResponseData[]>
  >(urls.cities, {
    params: {
      keyword,
      page,
      limit,
      stateId,
    },
  });
  return data;
}

export async function getInsurances(
  keyword = "",
  page = 1,
  limit = 20
): Promise<ResponsePaginationData<GetInsurancesResponseData[]>> {
  const { data } = await axiosInstance.get<
    ResponsePaginationData<GetInsurancesResponseData[]>
  >(urls.getInsurances, {
    params: {
      page,
      limit,
      keyword,
    },
  });
  return data;
}

export async function addInsurances({
  name,
}: {
  name: string;
}): Promise<ResponsePaginationData<GetInsurancesResponseData[]>> {
  const { data } = await axiosInstance.post<
    ResponsePaginationData<GetInsurancesResponseData[]>
  >(urls.addInsurances, {
    name,
  });
  return data;
}

export async function addSpecialities({
  name,
}: {
  name: string;
}): Promise<ResponsePaginationData<GetInsurancesResponseData[]>> {
  const { data } = await axiosInstance.post<
    ResponsePaginationData<GetInsurancesResponseData[]>
  >(urls.addSpecialities, {
    name,
  });
  return data;
}

export async function getSpecialities(
  keyword = "",
  page = 1,
  limit = 20
): Promise<ResponsePaginationData<GetSpecialitiesResponseData[]>> {
  const { data } = await axiosInstance.get<
    ResponsePaginationData<GetSpecialitiesResponseData[]>
  >(urls.getSpecialities, {
    params: {
      keyword,
      page,
      limit,
    },
  });
  return data;
}

export async function getCountries(
  keyword = "",
  page = 1,
  limit = 20
): Promise<ResponsePaginationData<CountriesResponseData[]>> {
  const { data } = await axiosInstance.get<
    ResponsePaginationData<CountriesResponseData[]>
  >(urls.countries, {
    params: {
      keyword,
      page,
      limit,
    },
  });
  return data;
}

export async function getLanguages(): Promise<
  ResponseData<GetLanguagesResponseData[]>
> {
  const { data } = await axiosInstance.get<
    ResponseData<GetLanguagesResponseData[]>
  >(urls.languages);
  return data;
}

export const verifyClientEmail = (token: string) => {
  return axios.post(urls.clientVerifyEmail, { token });
};

export const verifyProviderEmail = (token: string) => {
  return axios.post(urls.providerVerifyEmail, { token });
};

export const providerProfileImage = (formData: FormData) => {
  const token = getCookie("token");
  return axios.post(urls.providerProfileImage, formData, {
    headers: {
      Authorization: token ? `Bearer ${JSON.parse(token)}` : undefined,
    },
  });
};

export const clientProfileImage = (formData: FormData) => {
  const token = getCookie("token");
  return axios.post(urls.clientProfileImage, formData, {
    headers: {
      Authorization: token ? `Bearer ${JSON.parse(token)}` : undefined,
    },
  });
};

export const providerProfileIntroVideo = (formData: FormData) => {
  const token = getCookie("token");
  return axios.post(urls.providerProfileIntroVideo, formData, {
    headers: {
      Authorization: token ? `Bearer ${JSON.parse(token)}` : undefined,
    },
  });
};

export async function providerDetailsBySlug(
  slug: string
): Promise<ResponseData<ProviderGetMeResponseData>> {
  const { data } = await axiosInstance.get<
    ResponseData<ProviderGetMeResponseData>
  >(urls.providerBySlug.replace(":profileSlug", slug.toString()));
  return data;
}

export async function getAppointmentList(
  params: AppointmentsListParams
): Promise<ResponsePaginationData<AppointmentsListResponseData[]>> {
  const cleanedParams: Record<string, string | number | boolean> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      !(typeof value === "string" && value.trim() === "")
    ) {
      cleanedParams[key] = value;
    }
  });

  const { data } = await axiosInstance.get<
    ResponsePaginationData<AppointmentsListResponseData[]>
  >(urls.appointmentsList, { params: cleanedParams });
  return data;
}

export const sendReminder = async (
  appointmentId: string,
  data: { title: string; message: string }
) => {
  const url = urls.appointmentSendReminder.replace(
    ":appointmentId",
    appointmentId
  );
  const response = await axiosInstance.post(url, data);
  return response.data;
};

export const cancelAppointment = async (data: {
  appointmentId?: number;
  reason?: string | number;
}) => {
  const url = urls.appointmentCancelByProvider;
  const response = await axiosInstance.post(url, data);
  return response.data;
};

export const providerGetNotifications = async ({
  keyword = "",
  page = 1,
  limit = 10,
  type,
}: {
  keyword?: string;
  page?: number;
  limit?: number;
  type?: "all" | "appointment" | "support";
}) => {
  const url = urls.providerGetNotifications;
  const response = await axiosInstance.get(url, {
    params: { keyword, page, limit, type },
  });
  return response.data;
};

export async function createAppointment(
  appointmentData: CreateAppointmentData
): Promise<CreateAppointmentData> {
  const { data } = await axiosInstance.post<CreateAppointmentData>(
    urls.appointmentCreate,
    appointmentData
  );
  return data;
}

interface GetAppointmentDateParams {
  providerId: number;
}

export async function getAppointmentDate(
  params: GetAppointmentDateParams
): Promise<string[]> {
  const url = urls.appointmentFilledDate.replace(
    ":providerId",
    params.providerId.toString()
  );

  const { data } = await axiosInstance.get<string[]>(url);
  return data;
}

export const markNotificationAsRead = async (id: number) => {
  const url = `${urls.providerNotification}/${id}/read`;
  return await axiosInstance.patch(url);
};

export const getProviderStatistics = async () => {
  const url = urls.providerStatistics;
  return await axiosInstance.get(url);
};

export const getAppointmentTypeStats = async (type: string) => {
  const url = `${urls.providerAppointmentTypes}?type=${type}`;
  const res = await axiosInstance.get(url);
  return res.data.data;
};

export const getAppointmentPeakGraphic = async (type: string) => {
  const url = `${urls.providerAppointmentPeakTimes}?type=${type}`;
  const res = await axiosInstance.get(url);
  return res.data.data;
};

export const providerChangePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const res = await axiosInstance.post(urls.providerChangePassword, data);
  return res.data.data;
};

export const clientChangePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const res = await axiosInstance.post(urls.clientChangePassword, data);
  return res.data.data;
};

export const providerRequestEmailChange = async () => {
  const res = await axiosInstance.post(urls.providerRequestEmailChange);
  return res.data.data;
};

export const clientRequestEmailChange = async () => {
  const res = await axiosInstance.post(urls.clientRequestEmailChange);
  return res.data.data;
};

export const providerConfirmEmailChange = async (data: {
  newEmail: string;
  verificationCode: string;
}) => {
  const res = await axiosInstance.post(urls.providerConfirmEmailChange, data);
  return res.data.data;
};

export const clientConfirmEmailChange = async (data: {
  newEmail: string;
  verificationCode: string;
}) => {
  const res = await axiosInstance.post(urls.clientConfirmEmailChange, data);
  return res.data.data;
};

const priceMap = {
  premium: {
    monthly: "price_1RCqYwQlKIoWRWafz8umMJY9",
    annual: "price_1RCqZFQlKIoWRWafdFS4lWLA",
  },
  starter: {
    monthly: "price_1RCqYYQlKIoWRWafFtnYwAD4",
    annual: "price_1RCqYYQlKIoWRWafhPNl3TD7",
  },
};

export const subscribePlan = async (
  plan: "premium" | "starter",
  billingCycle: "monthly" | "annual"
) => {
  const priceId = priceMap[plan][billingCycle];
  const res = await axiosInstance.post(urls.providerSubscripton, {
    priceId,
  });
  return res.data.data.checkoutUrl;
};

export const providerSubscriptonCancel = async () => {
  const res = await axiosInstance.post<ResponseData<{ url: string }>>(
    urls.providerSubscriptonCancel
  );
  return res;
};

export const adminBlogUpload = (formData: FormData) => {
  const token = getCookie("token");
  return axios.post(urls.adminBlogUpload, formData, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJTbHVnIjoiYWRtaW4xIiwiaXNTdXBlciI6dHJ1ZSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ2MTkzNDM3LCJleHAiOjE3NDc0ODk0Mzd9.rQbbRMUmj-Vo7yvxIKWYBxhu8Et_6_ONEFK6QSviAys`,
    },
  });
};

export const adminBlogImageUpload = (formData: FormData) => {
  const token = getCookie("token");
  return axios.post(urls.adminBlogImageUpload, formData, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJTbHVnIjoiYWRtaW4xIiwiaXNTdXBlciI6dHJ1ZSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ2MTkzNDM3LCJleHAiOjE3NDc0ODk0Mzd9.rQbbRMUmj-Vo7yvxIKWYBxhu8Et_6_ONEFK6QSviAys`,
    },
  });
};

export async function getClientList(
  keyword = "",
  page = 1,
  limit = 20
): Promise<ResponseData<any[]>> {
  const { data } = await axiosInstance.get<ResponseData<any[]>>(
    urls.getClientList,
    {
      params: {
        page,
        limit,
        keyword,
      },
    }
  );
  return data;
}

export async function getProviderListForAdmin(
  keyword = "",
  page = 1,
  limit = 20
): Promise<ResponseData<any[]>> {
  const { data } = await axiosInstance.get<ResponseData<any[]>>(
    urls.getProviderList,
    {
      params: {
        page,
        limit,
        keyword,
      },
    }
  );
  return data;
}

export async function getBlogList(
  keyword = "",
  page = 1,
  limit = 20
): Promise<ResponsePaginationData<any[]>> {
  const { data } = await axiosInstance.get<ResponsePaginationData<any[]>>(
    urls.getBlogList,
    {
      params: {
        page,
        limit,
        keyword,
      },
    }
  );
  return data;
}
export async function getBlogContent(fileName: string) {
  const { data } = await axiosInstance.get(
    urls.getBlogContent.replaceAll(":fileName", fileName)
  );
  return data;
}
