"use client";
import React, { ChangeEvent, DragEvent, useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Flex,
  Text,
  Button,
  Box,
  Input,
  Image,
  Spinner,
} from "@chakra-ui/react";
import MultiRadiusIcon from "@repo/ui/components/icons/MultiRadiusIcon";
import { useToastNotification } from "@repo/ui/components/useToastNotification";
import { useProfileManagementPageContext } from "../../../../contexts/ProfileManagementPageContexts";
import { ProviderGetMeResponseData, ResponseData } from "@repo/ui/utils/type";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { FormProvider, set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { professionalDetailsModalValidation } from "../../../../validations/providerProfileManagementValidations";
import FormInput from "@repo/ui/components/form/FormInput";
import UnderlineEditIcon from "@repo/ui/components/icons/UnderlineEditIcon";
import FormAsyncSelect from "@repo/ui/components/form/FormAsyncSelect";
import {
  getSpecialities,
  getStates,
  providerProfileIntroVideo,
  providerUpdate,
} from "@repo/ui/utils/api";
import FormTextarea from "@repo/ui/components/form/FormTextarea";
import FormAsyncMultiSelect from "@repo/ui/components/form/FormAsyncMultiSelect";
import videoUploadAreaNotBorder from "@repo/ui/assets/video-upload-area-not-border.webp";
import RoundedArrowsIcon from "@repo/ui/components/icons/RoundedArrowsIcon";
import IntroVideo from "@repo/ui/components/video/IntroVideo";
import { colors } from "@repo/ui/theme";

interface Props {
  data: ProviderGetMeResponseData | undefined;
  refetch: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      | ResponseData<ProviderGetMeResponseData>
      | {
          data: undefined;
          success: false;
        },
      Error
    >
  >;
}

const ProfessionalDetailsEditModal = ({ data, refetch }: Props) => {
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const { activeModal, setActiveModal } = useProfileManagementPageContext();
  const showToast = useToastNotification();
  const methods = useForm({
    resolver: yupResolver(professionalDetailsModalValidation),
    mode: "onSubmit",
  });
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset({
      professionalTitle: data?.professionalTitle as string,
      licenseNumber: data?.licenseNumber
        ? Number(data?.licenseNumber)
        : undefined,
      licenseState: { id: data?.licenseState, name: data?.licenseState } as any,
      yearsExperience: data?.yearsExperience
        ? Number(data?.yearsExperience)
        : undefined,
      education: data?.education as string,
      bio: data?.bio as string,
      specialities: data?.specialities,
    });
  }, [activeModal]);

  const onSubmit = async (formData: {
    specialities: any[];
    professionalTitle: string;
    licenseNumber: number;
    licenseState: {
      id: string;
      name: string;
    };
    yearsExperience: number;
    education: string;
    bio: string;
  }) => {
    try {
      setIsSubmitLoading(true);
      const updatedData = {
        ...formData,
        licenseNumber: Number(formData.licenseNumber),
        licenseState: String(formData.licenseState?.name),
        specialities: formData?.specialities?.map((item) => item?.id),
      };
      await providerUpdate(updatedData);
      await refetch();
      reset();
      showToast(
        "Success",
        "Professional details updated successfully.",
        "success"
      );
      setActiveModal(undefined);
      setIsSubmitLoading(false);
    } catch (error) {
      setIsSubmitLoading(false);
      showToast("Error", "Failed to update professional details.", "error");
    }
  };

  const handleDrop = async (
    e: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>
  ) => {
    const file =
      (e as DragEvent<HTMLDivElement>)?.dataTransfer?.files?.[0] ||
      (e as ChangeEvent<HTMLInputElement>)?.target?.files?.[0];

    if (!file) return;

    const allowedTypes = ["video/mp4", "video/webm", "video/ogg"];
    const maxSizeInBytes = 50 * 1024 * 1024; // 50MB = 52,428,800 byte

    if (!allowedTypes.includes(file.type)) {
      showToast("Invalid File", "Please upload a valid video file.", "error");
      return;
    }

    if (file.size > maxSizeInBytes) {
      showToast("File Too Large", "Maximum allowed size is 50MB.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsSubmitLoading(true);
      await providerProfileIntroVideo(formData);
      showToast("Success", "Video uploaded successfully.", "success");
      setIsSubmitLoading(false);
    } catch (error) {
      setIsSubmitLoading(false);
      showToast("Error", "Failed to upload video.", "error");
    }
  };

  return (
    <Modal
      isOpen={activeModal === "professionalDetailsEdit"}
      onClose={() => {
        setActiveModal(undefined);
      }}
      isCentered
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent maxW={"600px"}>
        <ModalHeader overflow={"hidden"}>
          <Flex
            zIndex={-1}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <MultiRadiusIcon
              containerProps={{ marginLeft: "-124px", marginTop: "-116px" }}
              icon={
                <UnderlineEditIcon
                  svg={{ width: "24px", height: "24px" }}
                  path={{ fill: colors.secondary["950"].light }}
                />
              }
              outLineColor={"#EAECF0"}
            />
            <ModalCloseButton
              mt={"22px"}
              mr={"12px"}
              color={"secondary.400.light"}
              width={"12px"}
              height={"12px"}
              padding={"16px 24px"}
              _hover={{ bg: "transparent", opacity: "0.6" }}
              _active={{ bg: "transparent", opacity: "0.6" }}
            />
          </Flex>
        </ModalHeader>
        <ModalBody mt={"-130px"}>
          <Text
            color={"secondary.950.light"}
            fontWeight={600}
            fontSize={"18px"}
            mt={"16px"}
          >
            Edit Professional Details
          </Text>
          <Text
            color={"secondary.600.light"}
            fontWeight={400}
            fontSize={"14px"}
            mb={"24px"}
          >
            Update your professional details to ensure your profile is accurate
            and up to date.
          </Text>
          <FormProvider {...methods}>
            <form>
              <Flex gap={"16px"} alignItems={"center"}>
                <FormInput
                  name="professionalTitle"
                  label="Professional Title"
                  labelProps={{
                    color: "secondary.700.light",
                    fontSize: "14px",
                    fontWeight: "500",
                    mb: "8px",
                  }}
                />
                <FormInput
                  name="licenseNumber"
                  label="License Number"
                  labelProps={{
                    color: "secondary.700.light",
                    fontSize: "14px",
                    fontWeight: "500",
                    mb: "8px",
                  }}
                />
              </Flex>
              <Flex gap={"16px"} alignItems={"center"} mt={"16px"}>
                <FormAsyncSelect
                  name={"licenseState"}
                  label="License State/Region"
                  placeholder="Select License State"
                  searchInputProps={{
                    color: "secondary.950.light",
                    _placeholder: { color: "grayScale.600.light" },
                  }}
                  labelProps={{
                    color: "secondary.700.light",
                    fontSize: "14px",
                    fontWeight: "500",
                    mb: "8px",
                  }}
                  queryKey={["licenseState"]}
                  queryFn={(option) =>
                    getStates(
                      option?.queryKey[0] as string,
                      option?.pageParam,
                      20,
                      233
                    )
                  }
                />
                <FormInput
                  name={"yearsExperience"}
                  label="Years of Experience"
                  placeholder="Enter Years of Experience"
                  type="number"
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
              <FormTextarea
                name="education"
                label="Education"
                labelProps={{
                  mb: "0px",
                  color: "secondary.700.light",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
                containerProps={{ width: "100%", mt: "16px" }}
                textareaProps={{ rows: 4 }}
                placeholder="Enter Educations..."
              />
              <FormTextarea
                name="bio"
                label="Bio"
                labelProps={{
                  mb: "0px",
                  color: "secondary.700.light",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
                containerProps={{ width: "100%", mt: "16px" }}
                textareaProps={{ rows: 4 }}
                placeholder="Enter a  Bio..."
              />
              <FormAsyncMultiSelect
                name={"specialities"}
                placeholder="Select Specialities (up to 6)"
                label="Specialities"
                queryKey={["specialities"]}
                defaultValue={data?.specialities.map((item) => {
                  return { id: item.id, label: item.name };
                })}
                containerProps={{ mt: "16px" }}
                queryFn={(option) =>
                  getSpecialities(
                    option?.queryKey[0] as string,
                    option?.pageParam
                  )
                }
              />
              <Box
                width={"100%"}
                height={"1px"}
                my={"16px"}
                borderRadius={"50%"}
                bg={"secondary.100.light"}
              />
              <Flex
                mb={"8px"}
                mt={"16px"}
                width={"100%"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Text
                  fontWeight={500}
                  fontSize={"14px"}
                  color={"secondary.950.light"}
                >
                  Video Introduction
                </Text>
                {data?.videoIntroUrl && (
                  <Flex
                    cursor={"pointer"}
                    userSelect={"none"}
                    alignItems={"center"}
                    gap={"4px"}
                    pos={"relative"}
                  >
                    <RoundedArrowsIcon
                      svg={{ width: "16px", height: "16px" }}
                    />
                    <Text
                      color={"secondary.500.light"}
                      fontSize={"14px"}
                      fontWeight={"600"}
                      textDecor={"underline"}
                    >
                      Change Video
                    </Text>
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
                      accept="video/mp4, video/webm, video/ogg"
                      onChange={(e) => handleDrop(e)}
                      opacity={0}
                    />
                  </Flex>
                )}
              </Flex>

              {data?.videoIntroUrl ? (
                <IntroVideo videoUrl={data?.videoIntroUrl} />
              ) : (
                <Box
                  onDrop={(e) => handleDrop(e)}
                  onDragOver={(e) => e.preventDefault()}
                  position={"relative"}
                >
                  <Image
                    src={videoUploadAreaNotBorder?.src}
                    border={"1px solid"}
                    borderColor={"secondary.200.light"}
                    borderRadius={"12px"}
                    style={{ maxWidth: "100%" }}
                  />
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
                    accept="video/mp4, video/webm, video/ogg"
                    onChange={(e) => handleDrop(e)}
                    opacity={0}
                  />
                </Box>
              )}
            </form>
          </FormProvider>
        </ModalBody>
        <ModalFooter justifyContent={"center"} gap={"16px"}>
          <Button
            type="button"
            bg={"base.white.light"}
            border={"1px solid"}
            borderColor={"secondary.200.light"}
            borderRadius={"8px"}
            color={"secondary.900.light"}
            width={"100%"}
            _hover={{ bg: undefined }}
            _focus={{ bg: undefined }}
            _active={{ bg: undefined }}
            onClick={() => {
              setActiveModal(undefined);
            }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            bg={"primary.500.light"}
            border={"1px solid"}
            borderColor={"primary.500.light"}
            borderRadius={"8px"}
            color={"base.white.light"}
            width={"100%"}
            _hover={{
              bg: "base.white.light",
              color: "primary.500.light",
            }}
            _focus={{
              bg: "base.white.light",
              color: "primary.500.light",
            }}
            _active={{
              bg: "base.white.light",
              color: "primary.500.light",
            }}
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitLoading ? (
              <Spinner color="secondary.500.light" />
            ) : (
              <>Save Changes</>
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfessionalDetailsEditModal;
