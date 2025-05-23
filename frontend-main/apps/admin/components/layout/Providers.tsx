"use client";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@repo/ui/theme";
import { I18nextProvider } from "react-i18next";
import i18n from "@repo/ui/i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@repo/ui/components/context/AuthProvider";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <I18nextProvider i18n={i18n}>
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
          </I18nextProvider>
        </AuthProvider>
      </QueryClientProvider>
    </section>
  );
};

export default Providers;
