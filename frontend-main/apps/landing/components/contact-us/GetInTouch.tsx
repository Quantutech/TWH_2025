"use client";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import sms from "@repo/ui/assets/contact-us/sms.webp";
import call from "@repo/ui/assets/contact-us/call-calling.webp";
import FormInput from "@repo/ui/components/form/FormInput";
import { useForm, FormProvider } from "react-hook-form";
import FormPhoneInput from "@repo/ui/components/form/FormPhoneInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactValidationSchema } from "@repo/ui/validation/validations";
import { useToastNotification } from "@repo/ui/components/useToastNotification";
import { sendContactRequest } from "@repo/ui/utils/api";
import { ContactData } from "@repo/ui/utils/type";
import FormTextarea from "@repo/ui/components/form/FormTextarea";

const GetInTouch = () => {
  const methods = useForm<ContactData>({
    resolver: yupResolver(contactValidationSchema),
    mode: "onSubmit",
  });
  const { handleSubmit, reset } = methods;
  const showToast = useToastNotification();
  const onSubmit = async (data: ContactData) => {
    try {
      await sendContactRequest(data);
      showToast(
        "Mesajınız iletildi!",
        "En kısa sürede sizinle iletişime geçeceğiz."
      );
      reset();
    } catch (error) {
      showToast("Bir hata oluştu", "Lütfen tekrar deneyiniz.");
      console.error("Form Submission Error:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack
          flexDirection={{ base: "column", md: "row" }}
          alignItems="flex-start"
          justifyContent="flex-start"
          spacing={8}
          maxW={"1440px"}
          margin={"auto"}
          width={"100%"}
          padding={{
            base: "32px 16px",
            sm: "32px 16px",
            md: "32px 16px",
            lg: "32px 16px",
            xl: "64px 16px",
            "2xl": "64px 0px",
          }}
        >
          <VStack
            w={"50%"}
            gap={"8px"}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
            spacing={4}
          >
            <Text
              display={{ base: "none", sm: "block" }}
              fontWeight={"600"}
              fontSize={"16px"}
              color={"primary.500.light"}
            >
              Contact us
            </Text>
            <Text
              fontWeight={"600"}
              fontSize={{ base: "24px", md: "28px", lg: "36px" }}
              color={"secondary.950.light"}
            >
              Chat to our friendly team
            </Text>
            <Text
              fontWeight={"400"}
              fontSize={{ base: "16px", md: "18px", lg: "20px" }}
              color={"secondary.600.light"}
            >
              We'd love to hear from you! Please get in touch.
            </Text>
            {/* <HStack gap={"16px"}>
              <Box
                w={"48px"}
                h={"48px"}
                borderRadius={"10px"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                bg={"primary.500.light"}
              >
                <Image src={sms.src} />
              </Box>
              <VStack mt={"60px"} alignItems={"left"}>
                <Text fontWeight={"600"} fontSize={"20px"}>
                  Email
                </Text>
                <Text fontWeight={"400"} fontSize={"16px"}>
                  Our friendly team is here to help.
                </Text>
                <Text fontWeight={"600"} fontSize={"18px"}>
                  support@telewellnesshub.com
                </Text>
              </VStack>
            </HStack>
            <HStack gap={"16px"}>
              <Box
                w={"48px"}
                h={"48px"}
                borderRadius={"10px"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                bg={"primary.500.light"}
              >
                <Image src={call.src} />
              </Box>
              <VStack mt={"60px"} alignItems={"left"}>
                <Text fontWeight={"600"} fontSize={"20px"}>
                  Phone
                </Text>
                <Text fontWeight={"400"} fontSize={"16px"}>
                  Mon-Fri from 8am to 5pm.
                </Text>
                <Text fontWeight={"600"} fontSize={"18px"}>
                  +1 (555) 000-0000
                </Text>
              </VStack>
            </HStack> */}
          </VStack>
          <VStack w={{ base: "100%", md: "50%" }} spacing={4} align="stretch">
            <Flex flexDirection={"column"}>
              <Text
                fontWeight={"600"}
                fontSize={{ base: "24px", lg: "28px", xl: "36px" }}
                color={"secondary.950.light"}
              >
                Get in Touch
              </Text>
              <Text
                fontWeight={"400"}
                fontSize={{ base: "16px", lg: "18px", xl: "20px" }}
                color={"secondary.600.light"}
              >
                We'd love to hear from you. Please fill out this form.
              </Text>
            </Flex>
            <HStack>
              <FormInput
                name="firstName"
                label="First Name"
                placeholder="First Name"
                width="50%"
                labelProps={{ color: "secondary.700.light", fontSize: "14px" }}
              />
              <FormInput
                name="lastName"
                label="Last Name"
                placeholder="Last Name"
                width="50%"
                labelProps={{ color: "secondary.700.light", fontSize: "14px" }}
              />
            </HStack>
            <FormInput
              name="email"
              label="Email"
              placeholder="you@company.com"
              type="email"
              labelProps={{ color: "secondary.700.light", fontSize: "14px" }}
            />
            <FormPhoneInput
              name="phone"
              label="Phone Number"
              rules={{ required: "Required" }}
              phoneInputContainerStyle={{ width: "100%" }}
              labelProps={{ color: "secondary.700.light", fontSize: "14px" }}
            />
            <FormTextarea
              name="message"
              label="Message"
              placeholder="Leave us a message"
              textareaProps={{ rows: 6 }}
              labelProps={{ color: "secondary.700.light", fontSize: "14px" }}
            />
            <Button
              type="submit"
              bg={"primary.500.light"}
              color={"base.white.light"}
              fontSize={{ base: "14px", md: "16px" }}
              border={"1px solid"}
              borderColor={"primary.500.light"}
              _hover={{ bg: "transparent", color: "primary.500.light" }}
              _active={{ bg: "transparent", color: "primary.500.light" }}
            >
              Send message
            </Button>
          </VStack>
        </HStack>
      </form>
    </FormProvider>
  );
};

export default GetInTouch;
