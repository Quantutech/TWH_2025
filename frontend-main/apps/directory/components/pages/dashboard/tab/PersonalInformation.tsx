"use client";
import React, { ChangeEvent, Dispatch, SetStateAction, DragEvent } from "react";
import { Box, Text, Flex, Button, Input, Image } from "@chakra-ui/react";
import StatusTab from "./StatusTab";
import FormInput from "@repo/ui/components/form/FormInput";
import { useToastNotification } from "@repo/ui/components/useToastNotification";
import { providerGetMe } from "@repo/ui/utils/api";
import photoUploadArea from "@repo/ui/assets/photo-upload-area.webp";
import FormSelect from "@repo/ui/components/form/FormSelect";
import { genderOptions } from "@repo/ui/constants/constant";
import { useQuery } from "@tanstack/react-query";
import ProfileImage from "@repo/ui/components/profile/ProfileImage";

interface Props {
  activeStep: number | undefined;
  setActiveStep: Dispatch<SetStateAction<number | undefined>>;
  methods: any;
  setProfileImageFile: Dispatch<SetStateAction<File | undefined>>;
  previewImageUrl: string | undefined;
}

const PersonalInformation = ({
  activeStep,
  setActiveStep,
  methods,
  setProfileImageFile,
  previewImageUrl,
}: Props) => {
  const showToast = useToastNotification();
  const { data } = useQuery({
    queryKey: ["providerGetMe"],
    queryFn: () => providerGetMe(),
    retry: false,
  });

  const handleNextButtonClick = () => {
    const formNames = ["firstName", "lastName", "gender"];
    formNames.map((name) => {
      if (!methods?.getValues(name)) {
        methods?.setError(name, {
          type: "manual",
          message: "Required",
        });
      }
    });

    if (Object.keys(methods?.formState?.errors).length === 0) {
      setActiveStep(2);
    }
  };

  const handleDrop = async (
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

    setProfileImageFile(file);
  };

  return (
    <>
      <StatusTab activeStep={activeStep} />
      <Box
        bg={"base.white.light"}
        alignItems={"center"}
        border={"1px solid"}
        borderColor={"secondary.100.light"}
        borderRadius={"16px"}
        overflow={"hidden"}
        mt={"24px"}
        p={"16px 24px"}
      >
        <Text
          fontWeight={600}
          fontSize={"20px"}
          color={"grayScale.950.light"}
          mb={"24px"}
        >
          Personal Information
        </Text>
        <Flex width={"100%"} gap={"16px"}>
          <FormInput
            label="First Name*"
            placeholder="Enter First Name"
            name={"firstName"}
            rules={{ required: "Required" }}
            labelProps={{
              marginBottom: "4px",
              fontSize: "14px",
              color: "secondary.700.light",
            }}
            inputProps={{
              border: "1px solid",
              borderColor: "secondary.200.light",
              color: "#101828",
              _placeholder: {
                color: "#667085",
              },
            }}
          />
          <FormInput
            label="Middle Name"
            placeholder="Enter Middle Name"
            name={"middleName"}
            labelProps={{
              marginBottom: "4px",
              fontSize: "14px",
              color: "secondary.700.light",
            }}
            inputProps={{
              border: "1px solid",
              borderColor: "secondary.200.light",
              color: "#101828",
              _placeholder: {
                color: "#667085",
              },
            }}
          />
          <FormInput
            label="Last Name*"
            placeholder="Enter Last Name"
            name={"lastName"}
            rules={{ required: "Required" }}
            labelProps={{
              marginBottom: "4px",
              fontSize: "14px",
              color: "secondary.700.light",
            }}
            inputProps={{
              border: "1px solid",
              borderColor: "secondary.200.light",
              color: "#101828",
              _placeholder: {
                color: "#667085",
              },
            }}
          />
        </Flex>
        <Flex width={"100%"} gap={"16px"} my={"16px"}>
          <FormInput
            label="Email*"
            placeholder="Enter Email"
            name={"email"}
            disabled
            labelProps={{
              marginBottom: "4px",
              fontSize: "14px",
              color: "secondary.700.light",
            }}
            inputProps={{
              border: "1px solid",
              borderColor: "secondary.200.light",
              color: "#101828",
              _placeholder: {
                color: "#667085",
              },
            }}
          />
          <FormInput
            label="Your Password"
            placeholder="Enter Your Password"
            name={"password"}
            disabled
            type="password"
            labelProps={{
              marginBottom: "4px",
              fontSize: "14px",
              color: "secondary.700.light",
            }}
            secureText
            inputProps={{
              border: "1px solid",
              borderColor: "secondary.200.light",
              color: "#101828",
              _placeholder: {
                color: "#667085",
              },
            }}
          />
          <FormSelect
            name={"gender"}
            options={genderOptions}
            placeholder="Choose your Gender"
            label="Gender"
            searchInputProps={{
              color: "secondary.950.light",
              _placeholder: { color: "grayScale.600.light" },
            }}
            labelProps={{
              marginBottom: "4px",
              fontSize: "14px",
              color: "secondary.700.light",
            }}
          />
        </Flex>
        <Flex gap={"20px"}>
          <ProfileImage
            previewImageUrl={previewImageUrl}
            profileImageUrl={data?.data?.profileImageUrl}
            firstName={data?.data?.firstName}
            lastName={data?.data?.lastName}
            imageProps={{ width: "64px", height: "64px" }}
          />
          <Flex flexDirection={"column"} gap={"4px"}>
            <Text
              fontWeight={500}
              fontSize={"14px"}
              color={"secondary.700.light"}
            >
              Profile Images
            </Text>
            <Box
              onDrop={(e) => handleDrop(e)}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              position={"relative"}
            >
              <Image src={photoUploadArea?.src} maxW={"650px"} />
              <Input
                width={"100%"}
                height={"100%"}
                position={"absolute"}
                cursor={"pointer"}
                zIndex={100}
                top={0}
                left={0}
                right={0}
                bottom={0}
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => handleDrop(e)}
                opacity={0}
              />
            </Box>
          </Flex>
        </Flex>
        <Text
          fontWeight={600}
          fontSize={"20px"}
          color={"grayScale.950.light"}
          mt={"24px"}
          mb={"16px"}
        >
          Social Media
        </Text>
        <Flex gap={"16px"}>
          <FormInput
            label="Instagram Link"
            placeholder="www.instagram.com"
            name={"instagramUrl"}
            rules={{ required: "Required" }}
            labelProps={{
              marginBottom: "4px",
              fontSize: "14px",
              color: "secondary.700.light",
            }}
            isHttpsText
            inputProps={{
              color: "secondary.600.light",
              _placeholder: { color: "secondary.600.light" },
            }}
          />
          <FormInput
            label="Facebook Link"
            placeholder="www.facebook.com"
            name={"facebookUrl"}
            rules={{ required: "Required" }}
            labelProps={{
              marginBottom: "4px",
              fontSize: "14px",
              color: "secondary.700.light",
            }}
            isHttpsText
            inputProps={{
              color: "secondary.600.light",
              _placeholder: { color: "secondary.600.light" },
            }}
          />
        </Flex>
        <Flex gap={"16px"} mt={"16px"}>
          <FormInput
            label="YouTube Link"
            placeholder="www.youtube.com"
            name={"youtubeUrl"}
            labelProps={{
              marginBottom: "4px",
              fontSize: "14px",
              color: "secondary.700.light",
            }}
            isHttpsText
            inputProps={{
              color: "secondary.600.light",
              _placeholder: { color: "secondary.600.light" },
            }}
          />
          <FormInput
            label="X Link"
            placeholder="www.x.com"
            name={"xUrl"}
            labelProps={{
              marginBottom: "4px",
              fontSize: "14px",
              color: "secondary.700.light",
            }}
            isHttpsText
            inputProps={{
              color: "secondary.600.light",
              _placeholder: { color: "secondary.600.light" },
            }}
          />
        </Flex>
        <Flex gap={"12px"}>
          <Button
            type="button"
            fontSize={"16px"}
            fontWeight={600}
            bg={"base.white.light"}
            color={"secondary.900.light"}
            border={"1px solid"}
            borderColor={"secondary.200.light"}
            mt={"16px"}
            _hover={{ bg: "base.white.light", color: "primary.500.light" }}
            _active={{ bg: "base.white.light", color: "primary.500.light" }}
            onClick={() => {
              methods.clearErrors();
              setActiveStep(0);
            }}
          >
            Back
          </Button>
          <Button
            type="button"
            fontSize={"16px"}
            fontWeight={600}
            bg={"primary.500.light"}
            color={"base.white.light"}
            border={"1px solid"}
            borderColor={"primary.500.light"}
            mt={"16px"}
            _hover={{ bg: "base.white.light", color: "primary.500.light" }}
            _active={{ bg: "base.white.light", color: "primary.500.light" }}
            onClick={handleNextButtonClick}
          >
            Save and Continue
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default PersonalInformation;
