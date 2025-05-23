import React, { ChangeEvent, Dispatch, SetStateAction, DragEvent } from "react";
import { Box, Button, Flex, Input, Text, Image } from "@chakra-ui/react";
import StatusTab from "./StatusTab";
import FormInput from "@repo/ui/components/form/FormInput";
import FormAsyncSelect from "@repo/ui/components/form/FormAsyncSelect";
import FormTextarea from "@repo/ui/components/form/FormTextarea";
import { getSpecialities, getStates, providerGetMe } from "@repo/ui/utils/api";
import FormAsyncMultiSelect from "@repo/ui/components/form/FormAsyncMultiSelect";
import { useToastNotification } from "@repo/ui/components/useToastNotification";
import videoUploadArea from "@repo/ui/assets/video-upload-area.webp";
import { useQuery } from "@tanstack/react-query";
import RoundedArrowsIcon from "@repo/ui/components/icons/RoundedArrowsIcon";
import IntroVideo from "@repo/ui/components/video/IntroVideo";

interface Props {
  activeStep: number | undefined;
  setActiveStep: Dispatch<SetStateAction<number | undefined>>;
  methods: any;
  setProfileIntroFile: Dispatch<SetStateAction<File | undefined>>;
  previewIntroUrl: string | undefined;
}

const ProfessionalDetails = ({
  activeStep,
  setActiveStep,
  methods,
  setProfileIntroFile,
  previewIntroUrl,
}: Props) => {
  const { data } = useQuery({
    queryKey: ["providerGetMe"],
    queryFn: () => providerGetMe(),
    retry: false,
  });
  const showToast = useToastNotification();
  const handleNextButtonClick = () => {
    const formNames = [
      "professionalTitle",
      "licenseNumber",
      "licenseState",
      "yearsExperience",
      "education",
      "bio",
      "specialities",
    ];
    formNames.map((name) => {
      if (!methods?.getValues(name)) {
        methods?.setError(name, {
          type: "manual",
          message: "Required",
        });
      }
    });

    if (Object.keys(methods?.formState?.errors).length === 0) {
      setActiveStep(3);
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
    setProfileIntroFile(file);
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
        overflow={"auto"}
        mt={"24px"}
        p={"16px 24px"}
      >
        <Text
          fontWeight={600}
          fontSize={"20px"}
          color={"grayScale.950.light"}
          mb={"24px"}
        >
          Professional Details
        </Text>
        <FormInput
          label="Professional Title*"
          placeholder="Enter Professional Title"
          name={"professionalTitle"}
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
        <Flex width={"100%"} gap={"16px"} my={"16px"}>
          <FormInput
            label="License Number*"
            placeholder="Enter License Number"
            name={"licenseNumber"}
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
          <FormAsyncSelect
            name={"licenseState"}
            label="License State/Region*"
            placeholder="Select License State"
            searchInputProps={{
              color: "secondary.950.light",
              _placeholder: { color: "grayScale.600.light" },
            }}
            labelProps={{
              marginBottom: "4px",
              fontSize: "14px",
              color: "secondary.700.light",
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
            label="Years of Experience*"
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
        <Flex width={"100%"} gap={"16px"} my={"16px"}>
          <FormTextarea
            name="education"
            label="Education*"
            containerProps={{ width: "100%" }}
            textareaProps={{ rows: 6 }}
            placeholder="Enter Educations..."
          />
          <FormTextarea
            name="bio"
            label="Bio*"
            containerProps={{ width: "100%" }}
            textareaProps={{ rows: 6 }}
            placeholder="Enter a Bio..."
          />
        </Flex>
        <FormAsyncMultiSelect
          name={"specialities"}
          placeholder="Select Specialities (up to 6)"
          label="Specialities*"
          queryKey={["specialities"]}
          queryFn={(option) =>
            getSpecialities(option?.queryKey[0] as string, option?.pageParam)
          }
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
          {(previewIntroUrl || data?.data?.videoIntroUrl) && (
            <Flex
              cursor={"pointer"}
              userSelect={"none"}
              alignItems={"center"}
              gap={"4px"}
              pos={"relative"}
            >
              <RoundedArrowsIcon svg={{ width: "16px", height: "16px" }} />
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
        {previewIntroUrl || data?.data?.videoIntroUrl ? (
          <IntroVideo
            videoUrl={data?.data?.videoIntroUrl}
            videoPreviewUrl={previewIntroUrl}
          />
        ) : (
          <Box
            onDrop={(e) => handleDrop(e)}
            onDragOver={(e) => e.preventDefault()}
            position={"relative"}
          >
            <Image
              src={videoUploadArea?.src}
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
              setActiveStep(1);
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

export default ProfessionalDetails;
