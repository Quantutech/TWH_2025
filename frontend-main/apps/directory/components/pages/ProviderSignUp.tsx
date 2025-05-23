"use client";
import { useState } from "react";
import { Button, Flex, Spinner, Text, Image } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "@repo/ui/components/form/FormInput";
import FormCheckbox from "@repo/ui/components/form/FormCheckbox";
import { useAuth } from "@repo/ui/components/context/AuthProvider";
import { useToastNotification } from "@repo/ui/components/useToastNotification";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../validations/providerSignUpValidation";
import { useRouter } from "next/navigation";
import miniLogo from "@repo/ui/assets/mini-logo.webp";

const ProviderSignUp = () => {
  const router = useRouter();
  const { registerProvider } = useAuth();
  const showToast = useToastNotification();

  const methods = useForm({
    resolver: yupResolver(signUpSchema),
    mode: "onSubmit",
  });
  const { handleSubmit } = methods;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const landingUrl = process.env.NEXT_PUBLIC_LANDING_URL;
  const onSubmit = async (data: Record<string, any>) => {
    try {
      setIsLoading(true);
      await registerProvider(
        data.firstName,
        data.lastName,
        data.email,
        data.password,
        data.confirmPassword
      );
      showToast(
        "Registration Successful",
        "Your account has been created",
        "success"
      );
      router.push("/provider-sign-in");
      setIsLoading(false);
    } catch (error: any) {
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
            Create Account as a Provider
          </Text>
          <Text
            fontSize={{ base: "14px", md: "16px" }}
            fontWeight={400}
            color={"secondary.600.light"}
            mt={"-10px"}
          >
            Let's help you find your ideal therapist.
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
                  name="firstName"
                  label="First Name"
                  placeholder="Enter your First Name"
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
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter your Last Name"
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
                <FormInput
                  labelProps={{
                    color: "secondary.700.light",
                    fontSize: "14px",
                    _placeholder: {
                      color: "secondary.500.light",
                      fontsize: "16px",
                    },
                  }}
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Enter your Confirm Password"
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
                <FormCheckbox
                  name="check"
                  label={
                    <Flex>
                      I agree to the
                      <Text
                        ml={"4px"}
                        color={"primary.600.light"}
                        textDecoration={"underline"}
                        cursor={"pointer"}
                        onClick={() => {
                          router.push(`${landingUrl}/terms-conditions`);
                        }}
                      >
                        Terms & Conditions
                      </Text>
                    </Flex>
                  }
                />
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
                      <>Sign up</>
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
                  Already have an account?
                  <Text
                    textDecor={"underline"}
                    color={"primary.600.light"}
                    cursor={"pointer"}
                    fontWeight={600}
                    ml={"4px"}
                    _hover={{ color: "primary.800.light" }}
                    onClick={() => router.push("/provider-sign-in")}
                  >
                    Sign in
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

export default ProviderSignUp;
