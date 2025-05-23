import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Provider Verify Email - TeleWellness Hub",
};

const VerifiedEmailPage = dynamic(
  () => import("../../../components/pages/provider-verify-email/Content"),
  {
    ssr: false,
  }
);

export default VerifiedEmailPage;
