import React from "react";
import Layout from "../../../components/layout/Layout";
import ProfileDetails from "../../../components/provider-details/ProfileDetails";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Provider Details - TeleWellness Hub",
};

export default function ProviderDetails({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  return (
    <Layout
      mainContainerProps={{ padding: "0px" }}
      childrenContainerProps={{ maxWidth: "auto" }}
    >
      <ProfileDetails slug={slug} />
    </Layout>
  );
}
