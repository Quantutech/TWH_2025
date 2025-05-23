"use client";

import dynamic from "next/dynamic";

const CreateBlog = dynamic(
  () => import("../../../components/pages/blog-list/BlogList"),
  {
    ssr: false,
  }
);

export default CreateBlog;
