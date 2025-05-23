"use client";
import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "@repo/ui/components/form/FormInput";
import FormTextarea from "@repo/ui/components/form/FormTextarea";

const PartnerForm = () => {
  const methods = useForm({
    mode: "onSubmit",
  });
  const { handleSubmit } = methods;
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <Box
      id="partner-form"
      padding={{
        base: "32px 16px",
        sm: "32px 16px",
        md: "32px 16px",
        lg: "32px 16px",
        xl: "64px 16px",
        "2xl": "64px 0px",
      }}
      bg={"base.white.light"}
      w={"100%"}
    >
      <Box maxW={"1440px"} mx={"auto"}>
        <Text
          color={"secondary.950.light"}
          fontWeight={600}
          textAlign={"center"}
          fontSize={{ base: "24px", md: "36px" }}
          mb={{ base: "16px", md: "24px" }}
        >
          Become a TeleWellness Partner
        </Text>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box maxW={"640px"} mx={"auto"}>
              <Flex
                flexDirection={{ base: "column", md: "row" }}
                justifyContent={"center"}
                alignItems={"center"}
                gap={{ base: "12px", lg: "12px", xl: "20px" }}
              >
                <FormInput
                  name="firstName"
                  label="First Name"
                  type="text"
                  placeholder="Enter First Name"
                  labelProps={{
                    color: "secondary.700.light",
                    fontSize: "14px",
                    _placeholder: {
                      color: "secondary.500.light",
                      fontsize: "16px",
                    },
                  }}
                  inputProps={{
                    width: "100%",
                    border: "1px solid",
                    borderColor: "secondary.200.light",
                    outline: "none",
                    shadow: "none",
                    borderRadius: "8px",
                    height: "44px",
                    color: "secondary.500.light",
                    _focus: {
                      border: "1px solid",
                      borderColor: "secondary.400.light",
                      outline: "none",
                      shadow: "none",
                    },
                  }}
                />
                <FormInput
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter Last Name"
                  labelProps={{
                    color: "secondary.700.light",
                    fontSize: "14px",
                    _placeholder: {
                      color: "secondary.500.light",
                      fontsize: "16px",
                    },
                  }}
                  type="text"
                  inputProps={{
                    width: "100%",
                    border: "1px solid",
                    borderColor: "secondary.200.light",
                    outline: "none",
                    shadow: "none",
                    borderRadius: "8px",
                    height: "44px",
                    color: "secondary.500.light",
                    _focus: {
                      border: "1px solid",
                      borderColor: "secondary.400.light",
                      outline: "none",
                      shadow: "none",
                    },
                  }}
                />
              </Flex>
              <Flex
                flexDirection={{ base: "column", md: "row" }}
                justifyContent={"center"}
                alignItems={"center"}
                mt={"16px"}
                gap={{ base: "12px", lg: "12px", xl: "20px" }}
              >
                <FormInput
                  name="nameOfBusiness"
                  label="Name of Business"
                  type="text"
                  placeholder="Enter Name of Business"
                  labelProps={{
                    color: "secondary.700.light",
                    fontSize: "14px",
                    _placeholder: {
                      color: "secondary.500.light",
                      fontsize: "16px",
                    },
                  }}
                  inputProps={{
                    width: "100%",
                    border: "1px solid",
                    borderColor: "secondary.200.light",
                    outline: "none",
                    shadow: "none",
                    borderRadius: "8px",
                    height: "44px",
                    color: "secondary.500.light",
                    _focus: {
                      border: "1px solid",
                      borderColor: "secondary.400.light",
                      outline: "none",
                      shadow: "none",
                    },
                  }}
                />
                <FormInput
                  name="email"
                  label="Email"
                  placeholder="you@company.com"
                  labelProps={{
                    color: "secondary.700.light",
                    fontSize: "14px",
                    _placeholder: {
                      color: "secondary.500.light",
                      fontsize: "16px",
                    },
                  }}
                  type="email"
                  inputProps={{
                    width: "100%",
                    border: "1px solid",
                    borderColor: "secondary.200.light",
                    outline: "none",
                    shadow: "none",
                    borderRadius: "8px",
                    height: "44px",
                    color: "secondary.500.light",
                    _focus: {
                      border: "1px solid",
                      borderColor: "secondary.400.light",
                      outline: "none",
                      shadow: "none",
                    },
                  }}
                />
              </Flex>
              <FormTextarea
                name="content"
                label="What’s Your Collaboration Vision?"
                containerProps={{ maxW: "740px", mx: "auto", mt: "16px" }}
                labelProps={{
                  color: "secondary.700.light",
                  fontSize: "14px",
                  mb: "4px",
                  maxW: "240px",
                }}
                textareaProps={{ rows: 6, color: "secondary.600.light" }}
                placeholder="Describe your services or solutions..."
              />
              <Button
                type="submit"
                h={"48px"}
                w={"100%"}
                mx={"auto"}
                justifyContent={"center"}
                padding={"12px"}
                alignItems={"center"}
                border={"1px solid"}
                borderColor={"primary.500.light"}
                borderRadius={"8px"}
                fontWeight={"600"}
                fontSize={"16px"}
                color={"base.white.light"}
                bg={"primary.500.light"}
                mt={"16px"}
                _hover={{
                  bg: "base.white.light",
                  color: "primary.500.light",
                }}
                _active={{ bg: "transparent" }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default PartnerForm;
