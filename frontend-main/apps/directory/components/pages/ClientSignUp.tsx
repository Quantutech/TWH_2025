"use client";
import { useState } from "react";
import { Button, Flex, Spinner, Text, Image } from "@chakra-ui/react";
import CustomCarousel from "@repo/ui/components/custom-carousel/CustomCarousel";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "@repo/ui/components/form/FormInput";
import image1 from "@repo/ui/assets/custom-carousel/login/login-carousel-1.webp";
import { useAuth } from "@repo/ui/components/context/AuthProvider";
import { useToastNotification } from "@repo/ui/components/useToastNotification";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../validations/clientSignUpValidations";
import miniLogo from "@repo/ui/assets/mini-logo.webp";

const ClientSignUp = () => {
  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(signUpSchema),
    mode: "onSubmit",
  });
  const { handleSubmit } = methods;
  const { registerClient } = useAuth();
  const showToast = useToastNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: Record<string, any>) => {
    try {
      setIsLoading(true);
      await registerClient(
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
      router.push("/client-sign-in");
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
      <Flex w={"100%"}>
        <Flex
          w={{ base: "100%", md: "420px" }}
          m={"auto"}
          bg={"base.white.light"}
          padding={{ base: "16px", md: "32px" }}
          borderRadius={"16px"}
          flexDir={"column"}
          gap={{ base: "14px", md: "16px", lg: "20px" }}
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
            fontSize={"30px"}
            fontWeight={600}
            mt={"-10px"}
            color={"secondary.950.light"}
          >
            Create Account
          </Text>
          <Text
            fontSize={"16px"}
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
                gap={{ base: "12px", lg: "12px", xl: "18px" }}
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
                  width={{
                    base: "260px",
                    md: "300px",
                    lg: "320px",
                    xl: "360px",
                  }}
                  inputProps={{
                    border: "1px solid",
                    borderColor: "secondary.200.light",
                    outline: "none",
                    shadow: "none",
                    borderRadius: "8px",
                    height: {
                      base: "36px",
                      md: "38px",
                      lg: "40px",
                      xl: "44px",
                    },
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
                  width={{
                    base: "260px",
                    md: "300px",
                    lg: "320px",
                    xl: "360px",
                  }}
                  inputProps={{
                    border: "1px solid",
                    borderColor: "secondary.200.light",
                    outline: "none",
                    shadow: "none",
                    borderRadius: "8px",
                    height: {
                      base: "36px",
                      md: "38px",
                      lg: "40px",
                      xl: "44px",
                    },
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
                  placeholder="Enter your Email"
                  width={{
                    base: "260px",
                    md: "300px",
                    lg: "320px",
                    xl: "360px",
                  }}
                  inputProps={{
                    border: "1px solid",
                    borderColor: "secondary.200.light",
                    outline: "none",
                    shadow: "none",
                    borderRadius: "8px",
                    height: {
                      base: "36px",
                      md: "38px",
                      lg: "40px",
                      xl: "44px",
                    },
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
                  width={{
                    base: "260px",
                    md: "300px",
                    lg: "320px",
                    xl: "360px",
                  }}
                  inputProps={{
                    border: "1px solid",
                    borderColor: "secondary.200.light",
                    outline: "none",
                    shadow: "none",
                    borderRadius: "8px",
                    height: {
                      base: "36px",
                      md: "38px",
                      lg: "40px",
                      xl: "44px",
                    },
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
                  placeholder="Confirm your Password"
                  width={{
                    base: "260px",
                    md: "300px",
                    lg: "320px",
                    xl: "360px",
                  }}
                  inputProps={{
                    border: "1px solid",
                    borderColor: "secondary.200.light",
                    outline: "none",
                    shadow: "none",
                    borderRadius: "8px",
                    height: {
                      base: "36px",
                      md: "38px",
                      lg: "40px",
                      xl: "44px",
                    },
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
                  width={{
                    base: "260px",
                    md: "300px",
                    lg: "320px",
                    xl: "360px",
                  }}
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
                      <>Create Account</>
                    )}
                  </Button>
                  {/* <Button
                    type="button"
                    bg={"base.white.light"}
                    color={"secondary.800.light"}
                    gap={"8px"}
                    border={"1px solid"}
                    fontSize={"14px"}
                    borderColor={"secondary.200.light"}
                    _hover={{
                      bg: "base.white.light",
                      borderColor: "secondary.400.light",
                    }}
                    _active={{
                      bg: "base.white.light",
                      borderColor: "secondary.400.light",
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_1867_64)">
                        <path
                          d="M23.7663 12.2765C23.7663 11.4608 23.7001 10.6406 23.559 9.83813H12.2402V14.4591H18.722C18.453 15.9495 17.5888 17.2679 16.3233 18.1056V21.104H20.1903C22.4611 19.014 23.7663 15.9274 23.7663 12.2765Z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12.24 24.0008C15.4764 24.0008 18.2058 22.9382 20.1944 21.1039L16.3274 18.1055C15.2516 18.8375 13.8626 19.252 12.2444 19.252C9.11376 19.252 6.45934 17.1399 5.50693 14.3003H1.51648V17.3912C3.55359 21.4434 7.70278 24.0008 12.24 24.0008Z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.50277 14.3002C5.00011 12.8099 5.00011 11.196 5.50277 9.70569V6.61475H1.51674C-0.185266 10.0055 -0.185266 14.0004 1.51674 17.3912L5.50277 14.3002Z"
                          fill="#FBBC04"
                        />
                        <path
                          d="M12.24 4.74966C13.9508 4.7232 15.6043 5.36697 16.8433 6.54867L20.2694 3.12262C18.1 1.0855 15.2207 -0.034466 12.24 0.000808666C7.70277 0.000808666 3.55359 2.55822 1.51648 6.61481L5.50252 9.70575C6.45052 6.86173 9.10935 4.74966 12.24 4.74966Z"
                          fill="#EA4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1867_64">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    Sign up with Google
                  </Button> */}
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
                    onClick={() => router.push("/client-sign-in")}
                  >
                    Sign in
                  </Text>
                </Flex>
              </Flex>
            </form>
          </FormProvider>
        </Flex>
      </Flex>
      {/* <Flex
        w={{ base: "0%", lg: "50%" }}
        display={{ base: "none", lg: "flex" }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <CustomCarousel
          carouselItems={[
            {
              id: 1,
              imageSrc: image1.src,
              alt: "Image 1",
              description:
                "Untitled has saved us thousands of hours of work. We’re able to spin up projects  faster and take on more clients.",
              name: "Lula Meyers",
              title: "Product Manager, Hourglass",
              role: "Web Design Agency",
              evaluationScore: 3,
            },
            {
              id: 2,
              imageSrc: image1.src,
              alt: "Image 2",
              description:
                "Untitled has saved us thousands of hours of work. We’re able to spin up projects  faster and take on more clients.",
              name: "Lula Meyers",
              title: "Product Manager, Hourglass",
              role: "Web Design Agency",
              evaluationScore: 2,
            },
            {
              id: 3,
              imageSrc: image1.src,
              alt: "Image 3",
              description:
                "Untitled has saved us thousands of hours of work. We’re able to spin up projects  faster and take on more clients.",
              name: "Lula Meyers",
              title: "Product Manager, Hourglass",
              role: "Web Design Agency",
              evaluationScore: 3,
            },
          ]}
        />
      </Flex> */}
    </Flex>
  );
};

export default ClientSignUp;
