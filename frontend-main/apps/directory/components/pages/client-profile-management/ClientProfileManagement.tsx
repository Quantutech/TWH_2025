"use client";
import React, { ChangeEvent, DragEvent, useState } from "react";
import { Flex, Input, Text } from "@chakra-ui/react";
import ProfileImage from "@repo/ui/components/profile/ProfileImage";
import { useQuery } from "@tanstack/react-query";
import { clientGetMe, clientProfileImage } from "@repo/ui/utils/api";
import PhotoMachineIcon from "@repo/ui/components/icons/PhotoMachineIcon";
import { useToastNotification } from "@repo/ui/components/useToastNotification";
import PersonalInformation from "./sections/PersonalInformation";
import EmailEditModal from "./modals/EmailEditModal";
import ChangePasswordModal from "./modals/ChangePasswordModal";
import PersonalInformationModal from "./modals/PersonalInformationModal";

const ClientProfileManagement = () => {
  const showToast = useToastNotification();
  const { data, refetch } = useQuery({
    queryKey: ["clientGetMe"],
    queryFn: () => clientGetMe(),
    retry: false,
  });
  const [activeModal, setActiveModal] = useState<
    "personalInformationEdit" | "emailEdit" | "passwordEdit" | undefined
  >(undefined);

  const handleChangeProfileImage = async (
    e: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();

    const file =
      (e as DragEvent<HTMLDivElement>)?.dataTransfer?.files?.[0] ||
      (e as ChangeEvent<HTMLInputElement>)?.target?.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB = 5,242,880 byte

    if (!allowedTypes.includes(file.type)) {
      showToast(
        "Invalid File",
        "Please upload a valid image (PNG/JPG).",
        "error"
      );
      return;
    }

    if (file.size > maxSizeInBytes) {
      showToast("File Too Large", "Maximum allowed size is 5MB.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await clientProfileImage(formData);
      refetch();
      showToast("Success", "Image uploaded successfully.", "success");
    } catch (error) {
      showToast("Error", "Failed to upload image.", "error");
    }
  };

  return (
    <Flex
      flexDirection={"column"}
      padding={"24px 16px"}
      border={"1px solid"}
      borderColor={"secondary.100.light"}
      borderRadius={"16px"}
      bg={"base.white.light"}
      mt={"16px"}
    >
      <Flex gap={"16px"} alignItems={"center"}>
        <ProfileImage
          profileImageUrl={data?.data?.profileImageUrl}
          firstName={data?.data?.firstName}
          lastName={data?.data?.lastName}
          imageProps={{
            width: "160px",
            height: "160px",
            border: "4px solid",
            borderColor: "base.white.light",
          }}
        />
        <Flex
          flexDirection={"column"}
          alignItems={"flex-start"}
          justifyContent={"flex-end"}
          gap={"8px"}
          pb={"4px"}
        >
          <Text
            fontSize={"24px"}
            fontWeight={600}
            color={"secondary.950.light"}
          >
            {data?.data?.firstName && data?.data?.lastName
              ? `${data?.data?.firstName} ${data?.data?.lastName}`
              : "-"}
          </Text>
          <Flex
            gap={"4px"}
            alignItems={"center"}
            maxH={"30px"}
            position={"relative"}
          >
            <PhotoMachineIcon svg={{ width: "18px", height: "18px" }} />
            <Text
              color={"primary.500.light"}
              fontSize={"14px"}
              fontWeight={600}
              textDecor={"underline"}
            >
              Change Profile Picture
            </Text>
            <Input
              width={"100%"}
              height={"100%"}
              position={"absolute"}
              cursor={"pointer !important"}
              zIndex={100}
              padding={0}
              top={0}
              left={0}
              right={0}
              bottom={0}
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => handleChangeProfileImage(e)}
              opacity={0}
            />
          </Flex>
        </Flex>
      </Flex>
      <PersonalInformation data={data?.data} setActiveModal={setActiveModal} />

      {/* MODALS */}
      <EmailEditModal
        data={data?.data}
        activeModal={activeModal}
        setActiveModal={setActiveModal}
      />
      <ChangePasswordModal
        activeModal={activeModal}
        setActiveModal={setActiveModal}
      />
      <PersonalInformationModal
        data={data?.data}
        activeModal={activeModal}
        setActiveModal={setActiveModal}
      />
    </Flex>
  );
};

export default ClientProfileManagement;
