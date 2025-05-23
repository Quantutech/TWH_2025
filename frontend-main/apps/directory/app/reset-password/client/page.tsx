import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Verify Email - TeleWellness Hub",
};

const ResetPasswordClientPagge = dynamic(
  () =>
    import(
      "../../../components/pages/client-reset-password/ClientResetPassword"
    ),
  {
    ssr: false,
  }
);

export default ResetPasswordClientPagge;
