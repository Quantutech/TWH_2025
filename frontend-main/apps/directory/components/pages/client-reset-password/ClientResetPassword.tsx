"use client";
import { Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToastNotification } from "@repo/ui/components/useToastNotification";
import FormInput from "@repo/ui/components/form/FormInput";
import { resetPasswordClient } from "@repo/ui/utils/api";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { validationSchemaResetPassword } from "../../../validations/clientSignUpValidations";
import Layout from "../../layout/Layout";

const ClientResetPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const methods = useForm({
    resolver: yupResolver(validationSchemaResetPassword),
    mode: "onSubmit",
  });
  const { handleSubmit } = methods;
  const showToast = useToastNotification();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: Record<string, any>) => {
    try {
      if (!token) {
        showToast("Error", "Token not found", "error");
        return;
      }
      setIsLoading(true);
      const response = await resetPasswordClient({
        token,
        newPassword: data?.newPassword,
        newPasswordConfirmation: data?.newPasswordConfirmation,
      });
      if (response?.data) {
        showToast("Password reset successful", "success", "success");
        router.push("/client-sign-in");
      } else {
        throw new Error("Unexpected response");
      }
    } catch (error: any) {
      if (error?.errors?.length > 0) {
        error.errors.forEach((item: any) =>
          item.messages.forEach((msg: string) =>
            showToast("Error", msg || "An error occurred", "error")
          )
        );
      } else if (error?.message) {
        showToast("Error", error.message, "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout
      childrenContainerProps={{
        padding: { base: "0px", sm: "0px", md: "24px 64px" },
      }}
    >
      <Flex maxW="1400px" m="auto" w="100%">
        <Flex w="100%">
          <Flex
            w="100%"
            flexDir="column"
            gap={{ base: "14px", md: "16px", lg: "20px", xl: "24px" }}
            justifyContent="center"
            alignItems="center"
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect width="64" height="64" fill="url(#pattern0_1172_1748)" />
              <defs>
                <pattern
                  id="pattern0_1172_1748"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_1172_1748"
                    transform="translate(-0.031746) scale(0.0126984)"
                  />
                </pattern>
                <image
                  id="image0_1172_1748"
                  width="500"
                  height="75"
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>
            <Text fontSize="30px" fontWeight={600} color="secondary.950.light">
              Reset Password
            </Text>
            <Text
              fontSize="16px"
              fontWeight={400}
              color="secondary.600.light"
              mt="-10px"
            >
              Please enter your new password
            </Text>

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  gap={{ base: "12px", lg: "12px", xl: "20px" }}
                >
                  <FormInput
                    name="newPassword"
                    label="New Password"
                    placeholder="Enter new password"
                    labelProps={{
                      fontSize: "14px",
                      color: "secondary.700.light",
                    }}
                    width={{ base: "260px", md: "300px", lg: "360px" }}
                    inputProps={{
                      type: "text",
                      border: "1px solid",
                      borderColor: "secondary.200.light",
                      borderRadius: "8px",
                      height: "44px",
                      color: "secondary.500.light",
                      _focus: {
                        borderColor: "secondary.400.light",
                        outline: "none",
                        shadow: "none",
                      },
                    }}
                  />
                  <FormInput
                    name="newPasswordConfirmation"
                    label="Confirm New Password"
                    placeholder="Re-enter new password"
                    labelProps={{
                      fontSize: "14px",
                      color: "secondary.700.light",
                    }}
                    width={{ base: "260px", md: "300px", lg: "360px" }}
                    inputProps={{
                      type: "text",
                      border: "1px solid",
                      borderColor: "secondary.200.light",
                      borderRadius: "8px",
                      height: "44px",
                      color: "secondary.500.light",
                      _focus: {
                        borderColor: "secondary.400.light",
                        outline: "none",
                        shadow: "none",
                      },
                    }}
                  />
                  <Flex
                    width={{ base: "260px", md: "300px", lg: "360px" }}
                    flexDir="column"
                    gap="16px"
                  >
                    <Button
                      type="submit"
                      bg={isLoading ? "transparent" : "secondary.500.light"}
                      border={"1px solid"}
                      borderColor={"secondary.500.light"}
                      color={"base.white.light"}
                      disabled={isLoading}
                      _disabled={{ opacity: 1, cursor: "not-allowed" }}
                      _hover={{
                        bg: "transparent",
                        color: "secondary.500.light",
                      }}
                      _active={{
                        bg: "transparent",
                        color: "secondary.500.light",
                      }}
                    >
                      {isLoading ? (
                        <Spinner color="secondary.500.light" />
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
                  </Flex>
                </Flex>
              </form>
            </FormProvider>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default ClientResetPassword;
