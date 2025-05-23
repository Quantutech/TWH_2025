"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Layout from "../components/layout/Layout";
import AdminSignIn from "../components/pages/AdminSignIn";

const page = () => {
  const router = useRouter();

  // router.push("/dashboard");
  return (
    <Layout
      childrenContainerProps={{
        padding: { base: "16px 16px", sm: "20px 32px", md: "24px 64px" },
      }}
    >
      <AdminSignIn />
    </Layout>
  );
};

export default page;
