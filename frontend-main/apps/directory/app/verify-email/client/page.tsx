import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Verify Email - TeleWellness Hub",
};

const VerifiedEmailPage = dynamic(
  () => import("../../../components/pages/client-verify-email/Context"),
  {
    ssr: false,
  }
);

export default VerifiedEmailPage;
