"use client";
import { Flex, FlexProps, Icon, IconProps, Text } from "@chakra-ui/react";
import { AiOutlineFileSearch } from "react-icons/ai";

interface Props {
  containerProps?: FlexProps;
  iconProps?: IconProps;
}

const ListNoDataFound = ({ containerProps, iconProps }: Props) => {
  return (
    <Flex
      width={"100%"}
      height={"calc(100dvh - 250px)"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      {...containerProps}
    >
      <Icon as={AiOutlineFileSearch} w={12} h={12} {...iconProps} />
      <Text fontSize={{ base: "22px", md: "24px" }} fontWeight="semibold">
        No data found
      </Text>
      <Text fontSize="16px" textAlign={"center"}>
        Please check back later or adjust your filters.
      </Text>
    </Flex>
  );
};

export default ListNoDataFound;
