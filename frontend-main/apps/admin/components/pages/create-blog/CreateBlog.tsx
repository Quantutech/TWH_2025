"use client";
import React, { useState } from "react";
import CustomEditor from "@repo/ui/components/CustomEditor";
import Layout from "../../layout/admin-panel/Layout";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { adminBlogUpload } from "@repo/ui/utils/api";
import { useToastNotification } from "@repo/ui/components/useToastNotification";

const CreateBlog = () => {
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const showToast = useToastNotification();
  const handleSubmit = async () => {
    const blob = new Blob([content], { type: "text/html" });

    const formData = new FormData();
    formData.append("file", blob, "editor-content.html");
    formData.append("title", title);

    try {
      await adminBlogUpload(formData);
      showToast("Success", "Blog created successfully.", "success");
    } catch (error) {
      showToast("Error", "Failed to create blog.", "error");
    }
  };

  return (
    <Layout header="Create Blog">
      <Box
        padding={"16px"}
        border={"1px solid"}
        borderColor={"secondary.100.light"}
        borderRadius={"16px"}
        mt={4}
        backgroundColor={"base.white.light"}
      >
        <Text
          mr={"auto"}
          fontWeight={600}
          fontSize={"20px"}
          color={"secondary.950.light"}
        >
          Create Blog
        </Text>
        <Flex flexDir={"column"} gap={"4px"}>
          <Text color={"secondary.950.light"} fontWeight={500} mt={"16px"}>
            Title
          </Text>
          <Input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => {
              setTitle(e?.target?.value);
            }}
          />
        </Flex>
        <Flex flexDir={"column"} mt={"16px"} gap={"4px"}>
          <Text color={"secondary.950.light"} fontWeight={500}>
            Content
          </Text>
          <CustomEditor content={content} setContent={setContent} />
        </Flex>
        <Button
          type="button"
          bg={"primary.500.light"}
          border={"1px solid"}
          borderColor={"primary.500.light"}
          borderRadius={"8px"}
          mt={"16px"}
          color={"base.white.light"}
          width={"100%"}
          _hover={{
            bg: "base.white.light",
            color: "primary.500.light",
          }}
          _active={{
            bg: "base.white.light",
            color: "primary.500.light",
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Layout>
  );
};

export default CreateBlog;
