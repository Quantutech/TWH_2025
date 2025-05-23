"use client";

import React from "react";
import { Button, Center, Heading, Text, VStack, Icon } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";

const SuccessSubscription = () => {
  const router = useRouter();

  return (
    <Center minH="100vh" bg="gray.50">
      <VStack
        spacing={6}
        p={8}
        bg="white"
        boxShadow="lg"
        borderRadius="xl"
        textAlign="center"
      >
        <Icon as={CheckCircleIcon} w={16} h={16} color="green.400" />
        <Heading size="lg">Payment Successful!</Heading>
        <Text fontSize="md" color="gray.600">
          Thank you for subscribing. Your provider profile is now active.
        </Text>
        <Button colorScheme="teal" onClick={() => router.push(`/`)}>
          Go to Your Profile
        </Button>
      </VStack>
    </Center>
  );
};

export default SuccessSubscription;
