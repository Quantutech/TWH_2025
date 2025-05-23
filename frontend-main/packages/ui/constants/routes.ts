// Giriş yapmayan kullanıcıların giremeyecekleri rotalar
export const roleRoutes: Record<string, string[]> = {
  provider: [
    "/provider-panel/dashboard",
    "/provider-panel/profile-management",
    "/provider-panel/appointments",
    "/provider-panel/notifications",
    "/provider-panel/analytics",
  ],
  client: ["/client-panel/profile-management"],
  admin: [],
};

// Giriş yapan kullanıcıların giremeyecekleri rotalar
export const authRoutes: string[] = [
  "/client-sign-in",
  "/client-sign-up",
  "/client-forgot-password",
  "/provider-sign-in",
  "/provider-sign-up",
  "/provider-forgot-password",
  "/reset-password",
  "/verify-email",
];

// Hata durumunda default olarak yönlecekleri rotalar
export const defaultRedirect: Record<string, string> = {
  provider: "/provider-panel/dashboard",
  client: "/client-panel/profile-management",
  admin: "/dashboard",
};
