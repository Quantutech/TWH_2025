"use client";
import React, { useEffect, useMemo, useState } from "react";
import Welcome from "./tab/Welcome";
import PersonalInformation from "./tab/PersonalInformation";
import ProfessionalDetails from "./tab/ProfessionalDetails";
import PracticeBusiness from "./tab/PracticeBusiness";
import SessionAndInsurance from "./tab/SessionAndInsurance";
import Completed from "./tab/Completed";
import { useForm, FormProvider } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import {
  providerGetMe,
  providerProfileImage,
  providerProfileIntroVideo,
  providerUpdateForDashboard,
} from "@repo/ui/utils/api";
import { ProviderUpdateforDashboardSubmitData } from "@repo/ui/utils/type";
import { providerUpdateValidationSchema } from "../../../validations/clientSignUpValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToastNotification } from "@repo/ui/components/useToastNotification";
import { Flex, Spinner } from "@chakra-ui/react";
import DashboardPage from "./tab/DashboardPage";

const Content = () => {
  const [activeStep, setActiveStep] = useState<number | undefined>(undefined);
  const [appointmentCalendarType, setAppointmentCalendarType] = useState<{
    value: string | number;
    label: string;
    disabled?: boolean;
  }>();
  const [profileImageFile, setProfileImageFile] = useState<File | undefined>(
    undefined
  );
  const [previewImageUrl, setPreviewImageUrl] = useState<string | undefined>(
    undefined
  );
  const [profileIntroFile, setProfileIntroFile] = useState<File | undefined>(
    undefined
  );
  const [previewIntroUrl, setPreviewIntroUrl] = useState<string | undefined>(
    undefined
  );

  const showToast = useToastNotification();
  const { data, isLoading } = useQuery({
    queryKey: ["providerGetMe"],
    queryFn: () => providerGetMe(),
    retry: false,
  });

  useEffect(() => {
    if (profileImageFile) {
      const objectUrl = URL.createObjectURL(profileImageFile);
      setPreviewImageUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [profileImageFile]);

  useEffect(() => {
    if (profileIntroFile) {
      const objectUrl = URL.createObjectURL(profileIntroFile);
      setPreviewIntroUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [profileIntroFile]);

  const methods = useForm<ProviderUpdateforDashboardSubmitData>({
    resolver: yupResolver(providerUpdateValidationSchema()),
    context: {
      hasExternalAppointment: appointmentCalendarType?.value == "external",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (data?.data?.isProfileComplete) {
      setActiveStep(6);
    } else {
      setActiveStep(0);
    }
  }, [data?.data?.isProfileComplete]);

  useEffect(() => {
    if (data?.success) {
      methods.reset({
        firstName: data.data?.firstName || "",
        lastName: data.data?.lastName || "",
        email: data?.data?.email,
        appointmentDurations: {
          "15min": false,
          "30min": true,
          "45min": false,
          "60min": false,
        },
      });
    }
  }, [data, methods]);

  const onSubmit = async (data: ProviderUpdateforDashboardSubmitData) => {
    const formNames = [
      "languages",
      "appointmentCalendarType",
      "availabilityDays",
      "availabilityHoursFrom",
      "availabilityHoursTo",
    ] as const;

    formNames.map((name) => {
      if (!methods?.getValues(name)) {
        methods?.setError(name, {
          type: "manual",
          message: "Required",
        });
      }
    });

    const imageFormData = new FormData();
    imageFormData.append("file", profileImageFile as File);

    const introFormData = new FormData();
    introFormData.append("file", profileIntroFile as File);

    try {
      if (previewImageUrl) {
        await providerProfileImage(imageFormData);
      }
      if (previewIntroUrl) {
        await providerProfileIntroVideo(introFormData);
      }

      const payload: any = {
        firstName: data?.firstName,
        lastName: data?.lastName,
        middleName: data?.middleName as string,
        gender: data?.gender?.value,
        professionalTitle: data?.professionalTitle,
        licenseNumber: Number(data?.licenseNumber),
        licenseState: data?.licenseState?.name,
        yearsExperience: Number(data?.yearsExperience),
        education: data?.education,
        bio: data?.bio,
        phoneNumber: `+${data?.phoneNumber}`,
        country: data?.country?.name,
        state: data?.state?.name,
        city: data?.city?.name,
        zipCode: data?.zipCode?.toString(),
        streetAddress: data?.streetAddress,
        specialities: data?.specialities?.map((item) => item?.id),
        appointmentCalendarType: data?.appointmentCalendarType?.value as string,
        lat: 50,
        long: 60,
        instagramUrl: data?.instagramUrl as string,
        facebookUrl: data?.facebookUrl as string,
        youtubeUrl: data?.youtubeUrl as string,
        xUrl: data?.xUrl as string,
        minFee: data?.minimumFee as string,
        maxFee: data?.MaximumFee as string,
      };

      if (data?.appointmentCalendarType?.value === "our_system") {
        payload.languages = data?.languages?.map(
          (item) => item?.id
        ) as number[];
        payload.insurances = data?.insurances?.map((item) => item?.id);
        payload.appointmentTypes = [
          data?.appointmentTypes?.inPerson ? 1 : null,
          data?.appointmentTypes?.video ? 2 : null,
          data?.appointmentTypes?.phone ? 3 : null,
          data?.appointmentTypes?.text ? 4 : null,
        ].filter((val): val is number => val !== null);
        payload.workingHours = data?.availabilityDays?.map((item) => ({
          dayOfWeek: item.value,
          startTime: data?.availabilityHoursFrom?.value,
          endTime: data?.availabilityHoursTo?.value,
        })) as {
          dayOfWeek: string;
          startTime: string;
          endTime: string;
        }[];
      } else if (data?.appointmentCalendarType?.value === "external") {
        payload.externalAppointmentUrl = data?.externalAppointmentUrl;
      }

      await providerUpdateForDashboard(payload);
      showToast("Success", "Profile updated successfully", "success");

      setActiveStep(5);
    } catch (error: any) {
      showToast("Error", error?.message || "Profile update failed", "error");
    }
  };

  const activeTab = useMemo(() => {
    if (isLoading) {
      return (
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          bg={"base.white.light"}
          border={"1px solid"}
          borderColor={"secondary.100.light"}
          borderRadius={"16px"}
          overflow={"hidden"}
          mt={"24px"}
          p={"16px 24px"}
          height={"calc(100dvh - 136px)"}
        >
          <Spinner width={"50px"} height={"50px"} color="secondary.500.light" />
        </Flex>
      );
    }

    switch (activeStep) {
      case 0:
        return <Welcome setActiveStep={setActiveStep} />;
      case 1:
        return (
          <PersonalInformation
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            methods={methods}
            setProfileImageFile={setProfileImageFile}
            previewImageUrl={previewImageUrl}
          />
        );
      case 2:
        return (
          <ProfessionalDetails
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            methods={methods}
            setProfileIntroFile={setProfileIntroFile}
            previewIntroUrl={previewIntroUrl}
          />
        );
      case 3:
        return (
          <PracticeBusiness
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            methods={methods}
          />
        );
      case 4:
        return (
          <SessionAndInsurance
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            appointmentCalendarType={appointmentCalendarType}
            setAppointmentCalendarType={setAppointmentCalendarType}
          />
        );
      case 5:
        return <Completed setActiveStep={setActiveStep} />;
      case 6:
        return <DashboardPage />;
      default:
        return <></>;
    }
  }, [
    activeStep,
    methods,
    isLoading,
    previewImageUrl,
    previewIntroUrl,
    appointmentCalendarType,
  ]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods?.handleSubmit(onSubmit)}>{activeTab}</form>
    </FormProvider>
  );
};

export default Content;
