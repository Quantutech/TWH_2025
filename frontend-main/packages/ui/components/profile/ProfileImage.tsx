"use client";
import { Flex, FlexProps, Image, ImageProps } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  profileImageUrl: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  imageProps?: ImageProps & FlexProps;
  previewImageUrl?: string | undefined;
}

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const ProfileImage = ({
  profileImageUrl,
  previewImageUrl,
  firstName,
  lastName,
  imageProps,
}: Props) => {
  const [hasImageError, setHasImageError] = useState<boolean>(false);

  if (hasImageError) {
    return (
      <Flex
        width={"48px"}
        height={"48px"}
        justifyContent={"center"}
        alignItems={"center"}
        bg={"secondary.100.light"}
        borderRadius={"50%"}
        fontSize={"16px"}
        fontWeight={500}
        userSelect={"none"}
        cursor={"default"}
        {...imageProps}
      >
        {firstName?.charAt(0)}
        {lastName?.charAt(0)}
      </Flex>
    );
  } else if (previewImageUrl) {
    return (
      <Image
        src={`${previewImageUrl}`}
        width={"48px"}
        height={"48px"}
        borderRadius={"50%"}
        onError={() => setHasImageError(true)}
        {...imageProps}
      />
    );
  } else if (profileImageUrl) {
    return (
      <Image
        src={`${baseURL}/uploads/${profileImageUrl}`}
        width={"48px"}
        height={"48px"}
        borderRadius={"50%"}
        onError={() => setHasImageError(true)}
        {...imageProps}
      />
    );
  } else {
    return (
      <Flex
        width={"48px"}
        height={"48px"}
        justifyContent={"center"}
        alignItems={"center"}
        bg={"secondary.100.light"}
        borderRadius={"50%"}
        fontSize={"16px"}
        fontWeight={500}
        userSelect={"none"}
        cursor={"default"}
        {...imageProps}
      >
        {firstName?.charAt(0)}
        {lastName?.charAt(0)}
      </Flex>
    );
  }
};

export default ProfileImage;
