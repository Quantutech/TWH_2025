import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  VStack,
  Text,
} from "@chakra-ui/react";
import React, { forwardRef } from "react";
import {
  FaAward,
  FaCheckCircle,
  FaClock,
  FaStar,
  FaThumbsUp,
} from "react-icons/fa";

const ReviewsTab = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <VStack
      ref={ref}
      w={"867px"}
      borderRadius={"16px"}
      border={"1px solid"}
      borderColor={"secondary.100.light"}
      padding={"24px"}
      gap={"24px"}
      alignItems={"flex-start"}
      ml={"64px"}
      bg={"base.white.light"}
      mb={"24px"}
    >
      <HStack w={"819px"} justifyContent={"space-between"}>
        <Text fontWeight={"600"} fontSize={"20px"}>
          Patient reviews
        </Text>
        <Button w={"160px"} h={"40px"} bg={"primary.700.light"} color={"#fff"}>
          Write a review
        </Button>
      </HStack>
      <HStack
        w={"819px"}
        height={"87px"}
        justifyContent={"space-between"}
        p={"16px 24px"}
        borderRadius={"12px"}
        bg="primary.100.light"
      >
        <VStack w={"119px"} gap={"8px"}>
          <HStack>
            <Icon as={FaAward} boxSize={6} color="blue.500" />
            <Text fontWeight="bold" fontSize="lg">
              +10 Years
            </Text>
          </HStack>
          <Text fontSize="sm" color="gray.600">
            Experience
          </Text>
        </VStack>
        <VStack w={"171px"} gap={"8px"}>
          <HStack>
            <Icon as={FaStar} boxSize={5} color="yellow.400" />
            <Text ml={1} fontWeight="bold" fontSize="lg">
              4.9
            </Text>
            <Text ml={1} fontSize="sm" color="gray.600">
              (107 Reviews)
            </Text>
          </HStack>
          <Text fontSize="sm" color="gray.600" mt={1}>
            Rate
          </Text>
        </VStack>
        <VStack w={"171px"} gap={"8px"}>
          <HStack>
            <Icon as={FaCheckCircle} boxSize={6} color="green.500" />
            <Text fontWeight="bold" fontSize="lg">
              +10.000
            </Text>
          </HStack>
          <Text fontSize="sm" color="gray.600">
            Successful Appointment
          </Text>
        </VStack>
      </HStack>
      {[1, 2, 3].map((_, idx) => (
        <HStack
          key={idx}
          w="819px"
          h="183px"
          borderRadius="12px"
          border={"1px solid"}
          borderColor={"secondary.100.light"}
          p="16px"
          gap={"24px"}
          alignItems={"flex-start"}
        >
          <Box>
            <Avatar name="Emma Johnson" />
          </Box>
          <VStack align="flex-start" w={"615px"}>
            <Text fontWeight="bold">Emma Johnson</Text>
            <Flex align="center">
              <Icon as={FaStar} color="yellow.400" />
              <Text ml="1" fontWeight="semibold">
                4.9
              </Text>
            </Flex>
            <Flex align="center" gap="2">
              <Icon as={FaThumbsUp} color="green.500" />
              <Text>I recommend this doctor</Text>
            </Flex>
            <Flex align="center" gap="2">
              <Icon as={FaClock} color="blue.500" />
              <Text>Waiting time: 0-15 minutes</Text>
            </Flex>
            <Text>
              Dr. Hanna Morrell is very professional and patient. Highly
              recommend!
            </Text>
          </VStack>
          <Box>
            <Text fontSize="sm" color="gray.500">
              Nov 15, 2024
            </Text>
          </Box>
        </HStack>
      ))}
    </VStack>
  );
});

export default ReviewsTab;
