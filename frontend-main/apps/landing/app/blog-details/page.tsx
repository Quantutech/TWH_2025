import React from "react";
import Layout from "../../components/layout/Layout";
import MainContent from "../../components/blog/blog-details/MainContent";
import BreadCrumb from "@repo/ui/components/BreadCrumb";

const BlogDetails = () => {
  return (
    <Layout
      mainContainerProps={{ padding: "0px" }}
      childrenContainerProps={{ maxWidth: "auto" }}
    >
      <BreadCrumb
        secondLink={{ path: "/blog", label: "Blog" }}
        thirdLink={{ path: "/blog-details", label: "Blog Details" }}
        containerProps={{ pt: "16px" }}
      />
      <MainContent />
    </Layout>
  );
};

export default BlogDetails;
