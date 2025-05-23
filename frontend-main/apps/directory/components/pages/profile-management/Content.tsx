"use client";
import {
  Box,
  Flex,
  Input,
  Link,
  Spinner,
  Text,
  chakra,
} from "@chakra-ui/react";
import PhotoMachineIcon from "@repo/ui/components/icons/PhotoMachineIcon";
import ProfileImage from "@repo/ui/components/profile/ProfileImage";
import { useToastNotification } from "@repo/ui/components/useToastNotification";
import { providerGetMe, providerProfileImage } from "@repo/ui/utils/api";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, DragEvent, useState } from "react";
import { useProfileManagementPageContext } from "../../../contexts/ProfileManagementPageContexts";
import ChangePasswordModal from "./modals/ChangePasswordModal";
import ContactInformationEditModal from "./modals/ContactInformationEditModal";
import EmailEditModal from "./modals/EmailEditModal";
import InsuranceAndPaymentDetailsEditModal from "./modals/InsuranceAndPaymentDetailsEditModal";
import PersonalInformationEditModal from "./modals/PersonalInformationEditModal";
import ProfessionalDetailsEditModal from "./modals/ProfessionalDetailsEditModal";
import SessionDetailsEditModal from "./modals/SessionDetailsEditModal";
import SocialMediaEditModal from "./modals/SocialMediaEditModal";
import ContactInformation from "./sections/ContactInformation";
import PersonalInformation from "./sections/PersonalInformation";
import ProfessionalDetails from "./sections/ProfessionalDetails";
import SessionDetails from "./sections/SessionDetails";
import SocialMedia from "./sections/SocialMedia";
import SubscriptionAndPaymentDetails from "./sections/SubscriptionAndPaymentDetails";

const GradientBackground = chakra(Box, {
  baseStyle: {
    w: "%100",
    minH: { base: "120px", md: "200px" },
    bgGradient: "linear(to-r, #9C27B0, #FF9800)",
    p: 8,
  },
});

const Content = () => {
  const showToast = useToastNotification();
  const { activeSection, setActiveSection } = useProfileManagementPageContext();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["providerGetMe"],
    queryFn: () => providerGetMe(),
    retry: false,
  });
  const [appointmentCalendarType, setAppointmentCalendarType] = useState<{
    value: string | number;
    label: string;
    disabled?: boolean;
  }>();

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
      await providerProfileImage(formData);
      refetch();
      showToast("Success", "Image uploaded successfully.", "success");
    } catch (error) {
      showToast("Error", "Failed to upload image.", "error");
    }
  };

  const sectionLinks = [
    {
      key: "personalInfo",
      label: "Personal Information",
      href: "#personal-information",
      onClick: () => setActiveSection("personalInfo"),
    },
    {
      key: "socialMedia",
      label: "Social Media",
      href: "#social-media",
      onClick: () => setActiveSection("socialMedia"),
    },
    {
      key: "professionalDetails",
      label: "Professional Details",
      href: "#professional-details",
      onClick: () => setActiveSection("professionalDetails"),
    },
    {
      key: "contactInfo",
      label: "Contact Info",
      href: "#contact-info",
      onClick: () => setActiveSection("contactInfo"),
    },
    {
      key: "sessionDetails",
      label: "Session Details",
      href: "#session-details",
      onClick: () => setActiveSection("sessionDetails"),
    },
    {
      key: "subscriptionPayment",
      label: "Subscription & Payment",
      href: "#subscription-and-payment",
      onClick: () => setActiveSection("subscriptionPayment"),
    },
  ];

  if (isLoading) {
    return (
      <Flex
        width={"100%"}
        height={"calc(100dvh - 98px)"}
        mt={4}
        border={"1px solid"}
        borderColor={"secondary.100.light"}
        borderRadius={"16px"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Spinner width={"60px"} height={"60px"} color="secondary.500.light" />
      </Flex>
    );
  }

  return (
    <Flex
      flexDir={"column"}
      gap={"16px"}
      width={"100%"}
      height={"calc(100dvh - 98px)"}
      overflow={"auto"}
      mt={4}
    >
      {/* Profile Image and Tab Container */}
      <Flex
        flexDirection={"column"}
        padding={"16px 16px 0px 16px"}
        border={"1px solid"}
        borderColor={"secondary.100.light"}
        borderRadius={"16px"}
      >
        <GradientBackground />
        <Flex gap={"16px"} padding={"0px 16px"}>
          <ProfileImage
            profileImageUrl={data?.data?.profileImageUrl}
            firstName={data?.data?.firstName}
            lastName={data?.data?.lastName}
            imageProps={{
              width: "160px",
              height: "160px",
              border: "4px solid",
              borderColor: "base.white.light",
              mt: "-80px",
            }}
          />
          <Flex
            flexDirection={"column"}
            alignItems={"flex-start"}
            justifyContent={"flex-end"}
            gap={"4px"}
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
            <Text
              fontSize={"16px"}
              fontWeight={400}
              color={"secondary.500.light"}
            >
              {data?.data?.professionalTitle || "-"}
            </Text>
          </Flex>
          <Flex
            gap={"4px"}
            ml={"auto"}
            mt={"22px"}
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
        {/* Section Buttons */}
        <Flex
          width={"100%"}
          alignItems={"center"}
          color={"secondary.500.light"}
          fontWeight={"600"}
          fontSize={"14px"}
          mt={"24px"}
          gap={"2px"}
        >
          {sectionLinks.map((link) => (
            <Link
              href={link.href}
              onClick={link.onClick}
              padding={"8px 12px"}
              borderRadius={"2px"}
              transitionDuration={"200ms"}
              borderBottom={"2px solid"}
              borderColor={
                activeSection === link.key ? "primary.600.light" : "transparent"
              }
              bg={
                activeSection === link.key ? "primary.100.light" : "transparent"
              }
              _hover={{
                bg: "primary.100.light",
                color: "primary.600.light",
                borderBottom: "2px solid",
                borderColor: "primary.600.light",
                borderRadius: "2px",
              }}
              _active={{
                bg: "primary.100.light",
                color: "primary.600.light",
                borderBottom: "2px solid",
                borderColor: "primary.600.light",
                borderRadius: "2px",
              }}
            >
              {link.label}
            </Link>
          ))}
        </Flex>
      </Flex>

      {/* ALL SECTIONS */}
      <Flex flexDirection={"column"} gap={"16px"}>
        <PersonalInformation data={data?.data} />
        <SocialMedia data={data?.data} />
        <ProfessionalDetails data={data?.data} />
        <ContactInformation data={data?.data} />
        <SessionDetails data={data?.data} />
        <SubscriptionAndPaymentDetails data={data?.data} />
      </Flex>
      {/* MODALS - START */}
      <PersonalInformationEditModal data={data?.data} refetch={refetch} />
      <SocialMediaEditModal data={data?.data} refetch={refetch} />
      <EmailEditModal data={data?.data} refetch={refetch} />
      <ChangePasswordModal refetch={refetch} />
      <ProfessionalDetailsEditModal data={data?.data} refetch={refetch} />
      <ContactInformationEditModal data={data?.data} refetch={refetch} />
      <SessionDetailsEditModal
        data={data?.data}
        refetch={refetch}
        appointmentCalendarType={appointmentCalendarType}
        setAppointmentCalendarType={setAppointmentCalendarType}
      />
      <InsuranceAndPaymentDetailsEditModal
        data={data?.data}
        refetch={refetch}
      />
      {/* MODALS - END */}
    </Flex>
  );
};

export default Content;
