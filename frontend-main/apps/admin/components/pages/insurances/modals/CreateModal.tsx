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
} from "@chakra-ui/react";
import * as yup from "yup";
import MultiRadiusIcon from "@repo/ui/components/icons/MultiRadiusIcon";
import { useToastNotification } from "@repo/ui/components/useToastNotification";
import UnderlineEditIcon from "@repo/ui/components/icons/UnderlineEditIcon";
import { ProviderGetMeResponseData, ResponseData } from "@repo/ui/utils/type";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import FormPhoneInput from "@repo/ui/components/form/FormPhoneInput";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormAsyncSelect from "@repo/ui/components/form/FormAsyncSelect";
import {
  addInsurances,
  getCities,
  getCountries,
  getStates,
  providerUpdate,
} from "@repo/ui/utils/api";
import FormInput from "@repo/ui/components/form/FormInput";
import FormTextarea from "@repo/ui/components/form/FormTextarea";
import { colors } from "@repo/ui/theme";

interface Props {
  activeModal: string | undefined;
  setActiveModal: Dispatch<SetStateAction<string | undefined>>;
  refetch: any;
}

const CreateModal = ({ activeModal, setActiveModal, refetch }: Props) => {
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const showToast = useToastNotification();
  const methods = useForm<{ name: string }>({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Required"),
      })
    ),
    mode: "onSubmit",
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (formData: { name: string }) => {
    try {
      await addInsurances({
        name: formData?.name,
      });
      await refetch();
      reset();
      showToast("Success", "Insurance create successfully.", "success");
      setActiveModal(undefined);
      setIsSubmitLoading(false);
    } catch (error) {
      setIsSubmitLoading(false);
      showToast("Error", "Failed to create insurance.", "error");
    }
  };

  return (
    <Modal
      isOpen={activeModal === "create"}
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
            Create Insurance
          </Text>
          <Text
            color={"secondary.600.light"}
            fontWeight={400}
            fontSize={"14px"}
            mb={"24px"}
          >
            Please fill in the information below.
          </Text>
          <FormProvider {...methods}>
            <form>
              <FormInput
                name={"name"}
                label="Insurance Name"
                placeholder="Enter ınsurance name"
                labelProps={{
                  marginBottom: "4px",
                  fontSize: "14px",
                  color: "secondary.700.light",
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
              <>Create</>
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateModal;
