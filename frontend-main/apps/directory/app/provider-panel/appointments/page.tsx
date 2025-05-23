import React from "react";
import Layout from "../../../components/layout/provider-panel/Layout";
import ListOfAppointments from "../../../components/pages/appointments/ListOfAppointments";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Appointments - TeleWellness Hub",
};

const page = () => {
  return (
    <Layout header="Appointments">
      <ListOfAppointments />
    </Layout>
  );
};

export default page;
