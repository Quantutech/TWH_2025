"use client";
import dynamic from "next/dynamic";

const CreateBlog = dynamic(
  () => import("../../../components/pages/create-blog/CreateBlog"),
  {
    ssr: false,
  }
);

export default CreateBlog;
