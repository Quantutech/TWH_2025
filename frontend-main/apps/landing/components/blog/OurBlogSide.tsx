"use client";
import React, { useState } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

import image from "@repo/ui/assets/blog/blog-first.png";
import people1 from "@repo/ui/assets/blog/people/1.png";
import BlogList from "./BlogList";
import { colors } from "@repo/ui/theme";

const OurBlogSide = () => {
  const [activeBlog, setActiveBlog] = useState<string>("view_all");
  return (
    <>
      <Box
        maxW={"1440px"}
        margin={"auto"}
        padding={{
          base: "32px 16px",
          sm: "32px 16px",
          md: "32px 16px",
          lg: "32px 16px",
          xl: "64px 16px",
          "2xl": "64px 0px",
        }}
      >
        <Text
          fontWeight={600}
          color={"secondary.950.light"}
          fontSize={{ base: "20px", md: "32px", lg: "48px" }}
        >
          Resources and insights
        </Text>
        <Text
          fontWeight={400}
          color={"secondary.600.light"}
          fontSize={{ base: "16px", md: "18px", lg: "20px" }}
          mb={"8px"}
        >
          The latest health news, interviews, technologies and resources.
        </Text>
        <Image
          src={image.src}
          alt="blog-image"
          width={"100%"}
          height={"auto"}
        />
        <Text
          color={"primary.600.light"}
          fontWeight={600}
          fontSize={"14px"}
          mt={"8px"}
        >
          Design
        </Text>
        <Flex justifyContent={"space-between"}>
          <Text
            color={"secondary.950.light"}
            fontWeight={600}
            fontSize={{ base: "24px", md: "26px", lg: "30px" }}
            my={"8px"}
          >
            UX review presentations
          </Text>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              stroke={colors.secondary["950"].light}
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Flex>
        <Text color={"secondary.600.light"} fontSize={"16px"} fontWeight={400}>
          How do you create compelling presentations that wow your colleagues
          and impress your managers?
        </Text>
        <Flex mt={"8px"} gap={"12px"}>
          <Image
            src={people1.src}
            alt="blog-image"
            width={"40px"}
            height={"40px"}
          />
          <Flex flexDirection={"column"}>
            <Text
              fontWeight={600}
              fontSize={"14px"}
              color={"secondary.950.light"}
            >
              Lana Steiner
            </Text>
            <Text
              fontWeight={400}
              fontSize={"14px"}
              color={"secondary.600.light"}
            >
              18 Jan 2024
            </Text>
          </Flex>
        </Flex>
        <BlogList activeBlog={activeBlog} setActiveBlog={setActiveBlog} />
      </Box>
    </>
  );
};

export default OurBlogSide;
