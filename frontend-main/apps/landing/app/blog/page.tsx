import React from "react";
import OurBlogSide from "../../components/blog/OurBlogSide";
import Layout from "../../components/layout/Layout";
import BreadCrumb from "@repo/ui/components/BreadCrumb";

const Blog = () => {
  return (
    <Layout
      mainContainerProps={{ padding: "0px" }}
      childrenContainerProps={{ maxWidth: "auto" }}
    >
      <BreadCrumb
        secondLink={{ label: "Blog" }}
        containerProps={{ pt: "16px" }}
      />
      <OurBlogSide />
    </Layout>
  );
};

export default Blog;
