"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  Spinner,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import MultiRadiusIcon from "@repo/ui/components/icons/MultiRadiusIcon";
import { useToastNotification } from "@repo/ui/components/useToastNotification";
import UnderlineEditIcon from "@repo/ui/components/icons/UnderlineEditIcon";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "@repo/ui/components/form/FormInput";
import FormDatePicker from "@repo/ui/components/form/FormDatePicker";
import { yupResolver } from "@hookform/resolvers/yup";
import { personalInformationEditModalValidation } from "../../../../validations/clientProfileManagementValidations";
import {
  ClientGetMeResponseData,
  ClientUpdateSubmitData,
} from "@repo/ui/utils/type";
import {
  clientUpdate,
  getCities,
  getCountries,
  getStates,
} from "@repo/ui/utils/api";
import { colors } from "@repo/ui/theme";
import { useQueryClient } from "@tanstack/react-query";
import { genderOptions } from "@repo/ui/constants/constant";
import FormSelect from "@repo/ui/components/form/FormSelect";
import FormAsyncSelect from "@repo/ui/components/form/FormAsyncSelect";
import FormPhoneInput from "@repo/ui/components/form/FormPhoneInput";
import { capitalizeFirstLetter } from "@repo/ui/utils/helpers";

interface Props {
  data: ClientGetMeResponseData | undefined;
  activeModal:
    | "personalInformationEdit"
    | "emailEdit"
    | "passwordEdit"
    | undefined;
  setActiveModal: Dispatch<
    SetStateAction<
      "personalInformationEdit" | "emailEdit" | "passwordEdit" | undefined
    >
  >;
}

const PersonalInformationModal = ({
  data,
  activeModal,
  setActiveModal,
}: Props) => {
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const showToast = useToastNotification();
  const methods = useForm<ClientUpdateSubmitData>({
    resolver: yupResolver(personalInformationEditModalValidation),
    mode: "onSubmit",
  });
  const { handleSubmit, reset } = methods;
  const queryClient = useQueryClient();

  useEffect(() => {
    reset({
      firstName: data?.firstName,
      middleName: data?.middleName,
      lastName: data?.lastName,
      birthDate: data?.birthDate ? new Date(data.birthDate) : undefined,
      socialSecurityNumber: data?.socialSecurityNumber as string,
      gender: {
        value: data?.gender?.toLowerCase(),
        label: capitalizeFirstLetter(data?.gender),
      },
      country: { id: data?.address?.country, name: data?.address?.country },
      state: { id: data?.address?.state, name: data?.address?.state },
      city: { id: data?.address?.city, name: data?.address?.city },
      zipCode: data?.address?.zipCode,
      phoneNumber: data?.address?.phoneNumber?.startsWith("+")
        ? data?.address?.phoneNumber
        : `+${data?.address?.phoneNumber}`,
    });
  }, [activeModal]);

  const onSubmit = async (data: ClientUpdateSubmitData) => {
    try {
      setIsSubmitLoading(true);
      const localBirthDate = new Date(data.birthDate);
      await clientUpdate({
        firstName: data?.firstName,
        middleName: data?.middleName as string | undefined,
        lastName: data?.lastName,
        birthDate: new Date(
          localBirthDate.getTime() - localBirthDate.getTimezoneOffset() * 60000
        ),
        socialSecurityNumber: data?.socialSecurityNumber,
        gender: data?.gender?.value,
        country: data?.country?.name,
        state: data?.state?.name,
        city: data?.city?.name,
        zipCode: data?.zipCode,
        phoneNumber: data?.phoneNumber?.startsWith("+")
          ? data.phoneNumber
          : `+${data?.phoneNumber}`,
      });
      showToast(
        "Success",
        "Personal information updated successfully",
        "success"
      );
      reset();
      queryClient.refetchQueries({ queryKey: ["clientGetMe"] });
      setActiveModal(undefined);
      setIsSubmitLoading(false);
    } catch (error) {
      setIsSubmitLoading(false);
      showToast("Error", "Failed to update personal information", "error");
    }
  };

  return (
    <Modal
      isOpen={activeModal === "personalInformationEdit"}
      onClose={() => {
        reset();
        setActiveModal(undefined);
      }}
      isCentered
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent w={"660px"} minW={"660px"}>
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
            Edit Personal Information
          </Text>
          <Text
            color={"secondary.600.light"}
            fontWeight={400}
            fontSize={"14px"}
            mb={"24px"}
          >
            Update your personal information to ensure accurate and up-to-date
            records.
          </Text>
          <FormProvider {...methods}>
            <form>
              <Grid templateColumns={"repeat(2, 1fr)"} gap={"16px"}>
                <GridItem>
                  <FormInput
                    name={"firstName"}
                    placeholder="First Name"
                    label="First Name"
                    labelProps={{
                      color: "secondary.700.light",
                      fontSize: "14px",
                      fontWeight: "500",
                      mb: "8px",
                    }}
                    containerProps={{ width: "100%" }}
                  />
                </GridItem>
                <GridItem>
                  <FormInput
                    name={"middleName"}
                    placeholder="Middle Name"
                    label="Middle Name"
                    labelProps={{
                      color: "secondary.700.light",
                      fontSize: "14px",
                      fontWeight: "500",
                      mb: "8px",
                    }}
                    containerProps={{ width: "100%" }}
                  />
                </GridItem>
                <GridItem>
                  <FormInput
                    name={"lastName"}
                    placeholder="Last Name"
                    label="Last Name"
                    labelProps={{
                      color: "secondary.700.light",
                      fontSize: "14px",
                      fontWeight: "500",
                      mb: "8px",
                    }}
                    containerProps={{ width: "100%" }}
                  />
                </GridItem>
                <GridItem>
                  <FormPhoneInput
                    name="phoneNumber"
                    label="Phone number"
                    rules={{ required: "Required" }}
                    phoneInputContainerStyle={{
                      width: "100%",
                      border: "none",
                    }}
                    labelProps={{
                      color: "secondary.700.light",
                      fontSize: "14px",
                      fontWeight: "500",
                      mb: "8px",
                    }}
                    inputStyle={{
                      height: "40px",
                    }}
                  />
                </GridItem>
                <GridItem>
                  <FormDatePicker
                    name={"birthDate"}
                    label="Date of Birth"
                    labelProps={{
                      color: "secondary.700.light",
                      fontSize: "14px",
                      fontWeight: "500",
                      mb: "8px",
                    }}
                  />
                </GridItem>
                <GridItem>
                  <FormInput
                    name={"socialSecurityNumber"}
                    placeholder="Social Security Number (SSN)"
                    label="Social Security Number (SSN)"
                    labelProps={{
                      color: "secondary.700.light",
                      fontSize: "14px",
                      fontWeight: "500",
                      mb: "8px",
                    }}
                    containerProps={{ width: "100%" }}
                  />
                </GridItem>
                <GridItem>
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
                      color: "secondary.700.light",
                      fontSize: "14px",
                      fontWeight: "500",
                      mb: "8px",
                    }}
                  />
                </GridItem>
                <GridItem>
                  <FormAsyncSelect
                    name={"country"}
                    label="Country"
                    placeholder="Select Country"
                    searchInputProps={{
                      color: "secondary.950.light",
                      _placeholder: { color: "grayScale.600.light" },
                    }}
                    queryKey={["country"]}
                    queryFn={(option) =>
                      getCountries(
                        option?.queryKey[0] as string,
                        option?.pageParam
                      )
                    }
                    labelProps={{
                      color: "secondary.700.light",
                      fontSize: "14px",
                      fontWeight: "500",
                      mb: "8px",
                    }}
                  />
                </GridItem>
                <GridItem>
                  <FormAsyncSelect
                    name={"state"}
                    label="State/Region"
                    placeholder="Select State/Region"
                    searchInputProps={{
                      color: "secondary.950.light",
                      _placeholder: { color: "grayScale.600.light" },
                    }}
                    queryKey={["state", 20]}
                    queryFn={(option) =>
                      getStates(
                        option?.queryKey[0] as string,
                        option?.pageParam,
                        option?.queryKey[2] as number,
                        option?.queryKey[3] as number
                      )
                    }
                    labelProps={{
                      color: "secondary.700.light",
                      fontSize: "14px",
                      fontWeight: "500",
                      mb: "8px",
                    }}
                  />
                </GridItem>
                <GridItem>
                  <FormAsyncSelect
                    name={"city"}
                    label="City"
                    placeholder="Select City"
                    searchInputProps={{
                      color: "secondary.950.light",
                      _placeholder: { color: "grayScale.600.light" },
                    }}
                    queryKey={["city", 20]}
                    queryFn={(option) =>
                      getCities(
                        option?.queryKey[0] as string,
                        option?.pageParam,
                        option?.queryKey[2] as number,
                        option?.queryKey[3] as number
                      )
                    }
                    labelProps={{
                      color: "secondary.700.light",
                      fontSize: "14px",
                      fontWeight: "500",
                      mb: "8px",
                    }}
                  />
                </GridItem>
                <GridItem>
                  <FormInput
                    name={"zipCode"}
                    label="Zip Code"
                    type="number"
                    placeholder="Enter Zip Code"
                    labelProps={{
                      color: "secondary.700.light",
                      fontSize: "14px",
                      fontWeight: "500",
                      mb: "8px",
                    }}
                    inputProps={{
                      border: "1px solid",
                      borderColor: "secondary.200.light",
                      color: "secondary.950.light",
                      _placeholder: {
                        color: "#667085",
                      },
                    }}
                  />
                </GridItem>
              </Grid>
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
              reset();
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

export default PersonalInformationModal;
