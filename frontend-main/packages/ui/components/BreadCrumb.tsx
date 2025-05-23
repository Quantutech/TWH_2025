"use client";
import { Box, Flex, FlexProps, Text } from "@chakra-ui/react";
import HomeIcon from "./icons/HomeIcon";
import { useRouter } from "next/navigation";
import AngleRightIcon from "./icons/AngleRightIcon";

interface Props {
  firstLink?: { path?: string; label: string };
  secondLink?: { path?: string; label: string };
  thirdLink?: { path?: string; label: string };
  containerProps?: FlexProps;
}

const BreadCrumb = ({
  firstLink,
  secondLink,
  thirdLink,
  containerProps,
}: Props) => {
  const router = useRouter();

  return (
    <Flex
      maxW={"1440px"}
      margin={"auto"}
      alignItems={"center"}
      paddingX={"16px"}
      {...containerProps}
    >
      <Box
        width={"20px"}
        minW={"20px"}
        maxW={"20px"}
        height={"20px"}
        minHeight={"20px"}
        maxHeight={"20px"}
        cursor={"pointer"}
        opacity={1}
        transitionDuration={"300ms"}
        _hover={{ opacity: 0.6 }}
        onClick={() => {
          if (firstLink?.path) {
            router.push(firstLink?.path);
            return;
          }
          router.push("/");
        }}
      >
        <HomeIcon
          svg={{
            width: "100%",
            height: "100%",
          }}
        />
      </Box>
      {(secondLink?.label || secondLink?.path) && (
        <>
          <Box
            width={"16px"}
            minW={"16px"}
            maxW={"16px"}
            height={"16px"}
            minHeight={"16px"}
            maxHeight={"16px"}
            mx={"12px"}
          >
            <AngleRightIcon
              svg={{
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
          <Text
            color={"primary.700.light"}
            fontSize={"14px"}
            fontWeight={"600"}
            cursor={secondLink?.path ? "pointer" : "default"}
            onClick={() => {
              if (secondLink?.path) {
                router.push(secondLink?.path);
              }
            }}
          >
            {secondLink?.label}
          </Text>
        </>
      )}
      {(thirdLink?.label || thirdLink?.path) && (
        <>
          <Box
            width={"16px"}
            minW={"16px"}
            maxW={"16px"}
            height={"16px"}
            minHeight={"16px"}
            maxHeight={"16px"}
            mx={"12px"}
          >
            <AngleRightIcon
              svg={{
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
          <Text
            color={"primary.700.light"}
            fontSize={"14px"}
            fontWeight={"600"}
            cursor={thirdLink?.path ? "pointer" : "default"}
            onClick={() => {
              if (thirdLink?.path) {
                router.push(thirdLink?.path);
              }
            }}
          >
            {thirdLink?.label}
          </Text>
        </>
      )}
    </Flex>
  );
};

export default BreadCrumb;
