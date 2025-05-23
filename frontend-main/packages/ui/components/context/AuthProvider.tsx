"use client";
import { createContext, ReactNode, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import {
  loginAsAdmin,
  loginAsClient,
  loginAsProvider,
  registerAsClient,
  registerAsProvider,
} from "../../utils/api";
import { removeCookie, setCookie } from "../../utils/storage";
import {
  LoginResponse,
  RegisterCredentials,
  ResponseData,
} from "../../utils/type";
import { useRouter } from "next/navigation";

interface AuthContextValue {
  loginClient: (
    email: string,
    password: string
  ) => Promise<ResponseData<LoginResponse>>;
  loginProvider: (email: string, password: string) => Promise<void>;
  loginAdmin: (email: string, password: string) => Promise<void>;
  registerProvider: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<RegisterCredentials>;
  registerClient: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<RegisterCredentials>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const landingUrl = process.env.NEXT_PUBLIC_LANDING_URL;

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();

  async function loginClient(email: string, password: string) {
    const response = await loginAsClient({ email, password });

    if (response?.data) {
      const token = response.data.token;
      const decoded: {
        userId: number;
        userSlug: string;
        isEmailVerified: boolean;
        role: string;
        iat: number;
        exp: number;
      } = jwtDecode(token as string);
      const userRole = decoded.role;

      setCookie("token", JSON.stringify(response.data.token));
      setCookie("refreshToken", JSON.stringify(response.data.refreshToken));
      setCookie("role", JSON.stringify(userRole));
    }
    return response;
  }

  const loginProvider = async (email: string, password: string) => {
    const response = await loginAsProvider({ email, password });

    if (response?.data) {
      const token = response.data.token;
      const decoded: {
        userId: number;
        userSlug: string;
        isEmailVerified: boolean;
        role: string;
        iat: number;
        exp: number;
      } = jwtDecode(token as string);
      const userRole = decoded.role;
      setCookie("token", JSON.stringify(response.data.token));
      setCookie("refreshToken", JSON.stringify(response.data.refreshToken));
      setCookie("role", JSON.stringify(userRole));
      router.push("/provider-panel/dashboard");
    }
  };

  const loginAdmin = async (email: string, password: string) => {
    const response = await loginAsAdmin({ email, password });
    if (response?.data) {
      const token = response.data.token;
      const decoded: {
        userId: number;
        userSlug: string;
        isEmailVerified: boolean;
        role: string;
        iat: number;
        exp: number;
      } = jwtDecode(token as string);
      const userRole = decoded.role;
      setCookie("token", JSON.stringify(response.data.token));
      setCookie("refreshToken", JSON.stringify(response.data.refreshToken));
      setCookie("role", JSON.stringify(userRole));
      router.push("/blog/create");
    }
  };

  async function registerProvider(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    const response = await registerAsProvider({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });
    return response;
  }

  async function registerClient(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    const response = await registerAsClient({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });
    return response;
  }

  function logout() {
    removeCookie("token");
    removeCookie("refreshToken");
    removeCookie("role");
  }

  return (
    <AuthContext.Provider
      value={{
        loginClient,
        loginProvider,
        registerProvider,
        registerClient,
        logout,
        loginAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
