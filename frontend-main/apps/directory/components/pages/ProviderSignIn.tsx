"use client";
import { useState } from "react";
import { Button, Flex, Spinner, Text, Image } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "@repo/ui/components/form/FormInput";
import FormCheckbox from "@repo/ui/components/form/FormCheckbox";
import { useAuth } from "@repo/ui/components/context/AuthProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../validations/providerSignUpValidation";
import { useToastNotification } from "@repo/ui/components/useToastNotification";
import { useRouter } from "next/navigation";
import { removeCookie, setCookie } from "@repo/ui/utils/storage";
import miniLogo from "@repo/ui/assets/mini-logo.webp";

const ProviderSignIn = () => {
  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
  });
  const { handleSubmit } = methods;
  const { loginProvider } = useAuth();
  const showToast = useToastNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: Record<string, any>) => {
    try {
      setIsLoading(true);
      await loginProvider(data.email, data.password);
      showToast("Sign In Successful", "success");
      router.push("/provider-panel/dashboard");
      setIsLoading(false);
    } catch (error: any) {
      removeCookie("role");
      setIsLoading(false);
      if (error?.errors?.length > 0) {
        error?.errors?.map((item: any) =>
          item?.messages.map((msg: string) =>
            showToast(
              "Error",
              msg || "An error occurred while registering",
              "error"
            )
          )
        );
      } else if (error?.message) {
        showToast("Error", error?.message, "error");
      }
    }
  };

  return (
    <Flex maxW={"1400px"} m={"auto"}>
      <Flex
        w={{ base: "100%", md: "420px" }}
        m={"auto"}
        bg={"base.white.light"}
        padding={{ base: "16px", md: "32px" }}
        borderRadius={"16px"}
      >
        <Flex
          width={"100%"}
          flexDir={"column"}
          gap={{ base: "14px", md: "16px", lg: "20px", xl: "24px" }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Image
            src={miniLogo.src}
            alt="Logo"
            maxW={"64px"}
            minW={"64px"}
            maxH={"46px"}
            minH={"46px"}
          />
          <Text
            fontSize={{ base: "20px", md: "30px" }}
            fontWeight={600}
            color={"secondary.950.light"}
            maxW={"330px"}
            textAlign={"center"}
          >
            Sign in to your Provider Account
          </Text>
          <Text
            fontSize={{ base: "14px", md: "16px" }}
            fontWeight={400}
            color={"secondary.600.light"}
            mt={"-10px"}
          >
            Welcome back! Please enter your details.
          </Text>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={{ base: "12px", lg: "12px", xl: "20px" }}
              >
                <FormInput
                  labelProps={{
                    color: "secondary.700.light",
                    fontSize: "14px",
                    _placeholder: {
                      color: "secondary.500.light",
                      fontsize: "16px",
                    },
                  }}
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  width={{ base: "260px", md: "300px", lg: "360px" }}
                  inputProps={{
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
                  labelProps={{
                    color: "secondary.700.light",
                    fontSize: "14px",
                    _placeholder: {
                      color: "secondary.500.light",
                      fontsize: "16px",
                    },
                  }}
                  name="password"
                  label="Password"
                  placeholder="Enter your Password"
                  width={{ base: "260px", md: "300px", lg: "360px" }}
                  inputProps={{
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
                  secureText
                />
                <Flex
                  width={{ base: "260px", md: "300px", lg: "360px" }}
                  justifyContent={"space-around"}
                  alignItems={"center"}
                >
                  <FormCheckbox name="check" label="Remember me" />
                  <Button
                    type="button"
                    textDecoration={"underline"}
                    cursor={"pointer"}
                    color={"primary.600.light"}
                    padding={0}
                    width={"216px"}
                    bg={"none"}
                    _hover={{ bg: "none", color: "primary.800.light" }}
                    _active={{ bg: "none", color: "primary.800.light" }}
                    onClick={() => router.push("/provider-forgot-password")}
                  >
                    Forgot password?
                  </Button>
                </Flex>
                <Flex
                  width={{ base: "260px", md: "300px", lg: "360px" }}
                  flexDir={"column"}
                  gap={"16px"}
                >
                  <Button
                    type="submit"
                    bg={isLoading ? "transparent" : "secondary.500.light"}
                    border={"1px solid"}
                    borderColor={"secondary.500.light"}
                    color={"base.white.light"}
                    disabled={isLoading}
                    _disabled={{ opacity: 1, cursor: "not-allowed" }}
                    _hover={{ bg: "transparent", color: "secondary.500.light" }}
                    _active={{
                      bg: "transparent",
                      color: "secondary.500.light",
                    }}
                  >
                    {isLoading ? (
                      <Spinner color="secondary.500.light" />
                    ) : (
                      <>Sign in</>
                    )}
                  </Button>
                </Flex>
                <Flex
                  justifyContent={"center"}
                  alignItems={"center"}
                  color={"secondary.600.light"}
                  fontSize={"14px"}
                  fontWeight={400}
                >
                  Don’t have an account?
                  <Text
                    textDecor={"underline"}
                    color={"primary.600.light"}
                    cursor={"pointer"}
                    fontWeight={600}
                    ml={"4px"}
                    _hover={{ color: "primary.800.light" }}
                    onClick={() => router.push("/provider-sign-up")}
                  >
                    Sign up
                  </Text>
                </Flex>
              </Flex>
            </form>
          </FormProvider>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProviderSignIn;
