"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Flex, Text, Button, Spinner } from "@chakra-ui/react";
import { verifyProviderEmail } from "@repo/ui/utils/api";
import { useToastNotification } from "@repo/ui/components/useToastNotification";

const Content = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const showToast = useToastNotification();

  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setError("No token found in the URL.");
      setLoading(false);
      return;
    }
    verifyProviderEmail(token)
      .then(() => {
        showToast(
          "Email verified successfully",
          "You will be redirected to login in 5 seconds...",
          "success"
        );
        setVerificationSuccess(true);
        setTimeout(() => {
          router.push("/provider-sign-in");
        }, 5000);
      })
      .catch((err: { response: { data: { message: string } } }) => {
        const message =
          err?.response?.data?.message || "Invalid or expired token.";
        setError(message);
        showToast("Error", message || "An error occurred", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchParams]);

  if (loading) {
    return (
      <Flex w="100%" h="100vh" align="center" justify="center" flexDir="column">
        <Spinner size="lg" />
        <Text mt={4}>Verifying your email...</Text>
      </Flex>
    );
  }

  return (
    <Flex
      w="100%"
      h="100vh"
      align="center"
      justify="center"
      flexDir="column"
      gap="16px"
    >
      {verificationSuccess ? (
        <>
          <Text fontSize="2xl" fontWeight="bold">
            Your email has been verified!
          </Text>
          <Button
            onClick={() => router.push("/provider-sign-in")}
            variant="solid"
          >
            Back to Login
          </Button>
        </>
      ) : (
        <Text fontSize="lg" color="red.500">
          {error}
        </Text>
      )}
    </Flex>
  );
};

export default Content;
