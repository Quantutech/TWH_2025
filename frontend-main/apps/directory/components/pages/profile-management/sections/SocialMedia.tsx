import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ProviderGetMeResponseData } from "@repo/ui/utils/type";
import UnderlineEditIcon from "@repo/ui/components/icons/UnderlineEditIcon";
import { useProfileManagementPageContext } from "../../../../contexts/ProfileManagementPageContexts";
import CirclePlusIcon from "@repo/ui/components/icons/CirclePlusIcon";

interface Props {
  data: ProviderGetMeResponseData | undefined;
}

const SocialMedia = ({ data }: Props) => {
  const { setActiveModal } = useProfileManagementPageContext();
  return (
    <Box
      id="social-media"
      padding={"16px"}
      border={"1px solid"}
      borderColor={"secondary.100.light"}
      borderRadius={"16px"}
      bg={"base.white.light"}
    >
      <Text color={"grayScale.950.light"} fontSize={"18px"} fontWeight={"600"}>
        Social Media
      </Text>
      <Flex width={"100%"} flexWrap={"wrap"}>
        {/* INSTAGRAM LINK BOX */}
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"350px"}
          padding={"16px"}
          borderBottom={"1px solid"}
          borderRight={"1px solid"}
          borderColor={"secondary.100.light"}
        >
          <Flex flexDirection={"column"} gap={"4px"}>
            <Text
              color={"secondary.500.light"}
              fontSize={"14px"}
              fontWeight={"400"}
            >
              Instangram Link
            </Text>
            <Text
              color={"secondary.950.light"}
              fontSize={"16px"}
              fontWeight={"500"}
            >
              {data?.instagramUrl && data.instagramUrl.length > 30
                ? `${data.instagramUrl.slice(0, 30)}...`
                : data?.instagramUrl || "-"}
            </Text>
          </Flex>
          <Box
            transitionDuration={"200ms"}
            _hover={{ opacity: "0.5" }}
            onClick={() => {
              setActiveModal("socialMediaEditModal");
            }}
          >
            {data?.instagramUrl?.length ? (
              <UnderlineEditIcon
                svg={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
            ) : (
              <CirclePlusIcon
                svg={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
            )}
          </Box>
        </Flex>

        {/* FACEBOOK LINK BOX */}
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"350px"}
          padding={"16px"}
          borderBottom={"1px solid"}
          borderRight={"1px solid"}
          borderColor={"secondary.100.light"}
        >
          <Flex flexDirection={"column"} gap={"4px"}>
            <Text
              color={"secondary.500.light"}
              fontSize={"14px"}
              fontWeight={"400"}
            >
              Facebook Link
            </Text>
            <Text
              color={"secondary.950.light"}
              fontSize={"16px"}
              fontWeight={"500"}
            >
              {data?.facebookUrl && data.facebookUrl.length > 30
                ? `${data.facebookUrl.slice(0, 30)}...`
                : data?.facebookUrl || "-"}
            </Text>
          </Flex>
          <Box
            transitionDuration={"200ms"}
            _hover={{ opacity: "0.5" }}
            onClick={() => {
              setActiveModal("socialMediaEditModal");
            }}
          >
            {data?.facebookUrl?.length ? (
              <UnderlineEditIcon
                svg={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
            ) : (
              <CirclePlusIcon
                svg={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
            )}
          </Box>
        </Flex>

        {/* YOUTUBE LINK BOX */}
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"350px"}
          padding={"16px"}
          borderBottom={"1px solid"}
          borderRight={"1px solid"}
          borderColor={"secondary.100.light"}
        >
          <Flex flexDirection={"column"} gap={"4px"}>
            <Text
              color={"secondary.500.light"}
              fontSize={"14px"}
              fontWeight={"400"}
            >
              Youtube Link
            </Text>
            <Text
              color={"secondary.950.light"}
              fontSize={"16px"}
              fontWeight={"500"}
            >
              {data?.youtubeUrl && data.youtubeUrl.length > 30
                ? `${data.youtubeUrl.slice(0, 30)}...`
                : data?.youtubeUrl || "-"}
            </Text>
          </Flex>
          <Box
            transitionDuration={"200ms"}
            _hover={{ opacity: "0.5" }}
            onClick={() => {
              setActiveModal("socialMediaEditModal");
            }}
          >
            {data?.youtubeUrl?.length ? (
              <UnderlineEditIcon
                svg={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
            ) : (
              <CirclePlusIcon
                svg={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
            )}
          </Box>
        </Flex>

        {/* X LINK BOX */}
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"350px"}
          padding={"16px"}
          borderBottom={"1px solid"}
          borderRight={"1px solid"}
          borderColor={"secondary.100.light"}
        >
          <Flex flexDirection={"column"} gap={"4px"}>
            <Text
              color={"secondary.500.light"}
              fontSize={"14px"}
              fontWeight={"400"}
            >
              X Link
            </Text>
            <Text
              color={"secondary.950.light"}
              fontSize={"16px"}
              fontWeight={"500"}
            >
              {data?.xUrl && data.xUrl.length > 30
                ? `${data.xUrl.slice(0, 30)}...`
                : data?.xUrl || "-"}
            </Text>
          </Flex>
          <Box
            transitionDuration={"200ms"}
            _hover={{ opacity: "0.5" }}
            onClick={() => {
              setActiveModal("socialMediaEditModal");
            }}
          >
            {data?.xUrl?.length ? (
              <UnderlineEditIcon
                svg={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
            ) : (
              <CirclePlusIcon
                svg={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
            )}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SocialMedia;
