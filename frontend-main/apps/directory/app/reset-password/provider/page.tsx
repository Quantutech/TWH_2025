import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Verify Email - TeleWellness Hub",
};

const ResetPasswordProviderPage = dynamic(
  () =>
    import(
      "../../../components/pages/provider-reset-password/ProviderResetPassword"
    ),
  {
    ssr: false,
  }
);

export default ResetPasswordProviderPage;
