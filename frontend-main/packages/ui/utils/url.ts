export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const urls = {
  // Client
  clientLogin: `${baseUrl}/client/login`,
  clientRegister: `${baseUrl}/client/register`,
  clientRefreshToken: `${baseUrl}/client/refresh-token`,
  clientResetPassword: `${baseUrl}/client/reset-password`,
  clientSendEmail: `${baseUrl}/client/send-verification-email`,
  clientVerifyEmail: `${baseUrl}/client/verify-email`,
  clientForgotPassword: `${baseUrl}/client/forgot-password`,
  clientGoogleLogin: `${baseUrl}/client/google/login?code=:code`,
  clientGoogleCallback: `${baseUrl}/client/google/callback?code=:code`,
  clientGetMe: `${baseUrl}/client/me`,
  clientUpdate: `${baseUrl}/client/update`,
  clientProfileImage: `${baseUrl}/client/upload/profile-image`,
  clientConfirmEmailChange: `${baseUrl}/client/confirm-email-change`,
  clientRequestEmailChange: `${baseUrl}/client/request-email-change`,
  clientChangePassword: `${baseUrl}/client/change-password`,

  // Provider
  providerLogin: `${baseUrl}/provider/login`,
  providerRegister: `${baseUrl}/provider/register`,
  providerRefreshToken: `${baseUrl}/provider/refresh-token`,
  providerResetPassword: `${baseUrl}/provider/reset-password`,
  providerSendEmail: `${baseUrl}/provider/send-verification-email`,
  providerVerifyEmail: `${baseUrl}/provider/verify-email`,
  providerForgotPassword: `${baseUrl}/provider/forgot-password`,
  providerGoogleLogin: `${baseUrl}/provider/google/login?code=:code`,
  providerGoogleCallback: `${baseUrl}/provider/google/callback?code=:code`,
  providerGetMe: `${baseUrl}/provider/me`,
  providerUpdate: `${baseUrl}/provider/update`,
  providerUpdateForDashboard: `${baseUrl}/provider/update-dashboard`,
  providerProfileImage: `${baseUrl}/provider/upload/profile-image`,
  providerProfileIntroVideo: `${baseUrl}/provider/upload/profile-video-intro`,
  providerList: `${baseUrl}/provider/list`,
  providerBySlug: `${baseUrl}/provider/profile/:profileSlug`,
  providerGetNotifications: `${baseUrl}/provider/notifications`,
  providerNotification: `${baseUrl}/provider/notification`,
  providerStatistics: `${baseUrl}/provider/dashboard/appointment-stats`,
  providerAppointmentTypes: `${baseUrl}/provider/dashboard/appointment-type-stats`,
  providerAppointmentPeakTimes: `${baseUrl}/provider/dashboard/appointment-peak-times-stats`,
  providerChangePassword: `${baseUrl}/provider/change-password`,
  providerRequestEmailChange: `${baseUrl}/provider/request-email-change`,
  providerConfirmEmailChange: `${baseUrl}/provider/confirm-email-change`,

  // Admin
  states: `${baseUrl}/address/states`,
  getInsurances: `${baseUrl}/util/insurances`,
  getBlogList: `${baseUrl}/upload/blog`,
  getBlogContent: `${baseUrl}/uploads/:fileName`,
  getClientList: `${baseUrl}/admin/client`,
  getProviderList: `${baseUrl}/admin/provider`,
  addInsurances: `${baseUrl}/util/insurances`,
  addSpecialities: `${baseUrl}/util/specialities`,
  getSpecialities: `${baseUrl}/util/specialities`,
  countries: `${baseUrl}/address/countries`,
  cities: `${baseUrl}/address/cities`,
  languages: `${baseUrl}/util/languages`,
  adminLogin: `${baseUrl}/admin/login`,
  adminGetMe: `${baseUrl}/admin/me`,
  adminBlogUpload: `${baseUrl}/upload/blog`,
  adminBlogImageUpload: `${baseUrl}/upload/image`,

  // Appointments
  appointmentsList: `${baseUrl}/appointments/list`,
  appointmentSendReminder: `${baseUrl}/appointments/:appointmentId/send-reminder`,
  appointmentCancelByProvider: `${baseUrl}/appointments/cancel/provider`,
  appointmentCreate: `${baseUrl}/appointments/create`,
  appointmentFilledDate: `${baseUrl}/appointments/filled-appointments/:providerId`,

  //Contact Us
  contactUs: `${baseUrl}/utils/contact-us`,

  //Stripe
  providerSubscripton: `${baseUrl}/subscriptions/subscribe`,
  providerSubscriptonCancel: `${baseUrl}/subscriptions/cancel`,
};
