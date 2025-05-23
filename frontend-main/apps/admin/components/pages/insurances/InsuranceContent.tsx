"use client";
import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getInsurances } from "@repo/ui/utils/api";
import Pagination from "@repo/ui/components/Pagination";
import { getFormattedDateTime } from "@repo/ui/utils/helpers";
import CreateModal from "./modals/CreateModal";

const InsuranceContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeModal, setActiveModal] = useState<string | undefined>();
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["insurances", currentPage, 20],
    queryFn: (options) => {
      return getInsurances(
        "",
        options?.queryKey?.[1] as number,
        options?.queryKey?.[2] as number
      );
    },
  });

  const dataSide = useMemo(() => {
    if (isError) {
      return (
        <Flex
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          padding={"16px 0px"}
          height={"calc(100dvh - 206px)"}
        >
          No data found
        </Flex>
      );
    } else if (isLoading) {
      return (
        <Flex
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          padding={"16px 0px"}
          height={"calc(100dvh - 206px)"}
        >
          <Spinner color="secondary.500.light" width={"40px"} height={"40px"} />
        </Flex>
      );
    } else if (data?.data?.data?.length) {
      return (
        <Flex
          width={"100%"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          padding={"16px 0px 0px 0px"}
          height={"calc(100dvh - 206px)"}
        >
          <Box overflow={"auto"} pb={"16px"}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Created At</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.data?.data?.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.name}</Td>
                    <Td>{getFormattedDateTime(item.createdAt.toString())}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          <Pagination
            currentPage={currentPage}
            totalPages={data?.data?.meta?.totalPages || 0}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
          />
        </Flex>
      );
    }
  }, [data, isLoading, isError]);

  return (
    <Box
      padding={"16px 24px"}
      border={"1px solid"}
      borderColor={"secondary.100.light"}
      borderRadius={"16px"}
      mt={4}
      backgroundColor={"base.white.light"}
    >
      <Flex
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text
          mr={"auto"}
          fontWeight={600}
          fontSize={"20px"}
          color={"secondary.950.light"}
        >
          Insurances
        </Text>
        <Button
          type="button"
          border={"1px solid"}
          borderColor={"secondary.500.light"}
          bg={"base.white.light"}
          color={"secondary.500.light"}
          _hover={{
            bg: "secondary.500.light",
            color: "base.white.light",
          }}
          _active={{
            bg: "secondary.500.light",
            color: "base.white.light",
          }}
          onClick={() => setActiveModal("create")}
        >
          Create
        </Button>
      </Flex>
      {dataSide}
      <CreateModal
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        refetch={refetch}
      />
    </Box>
  );
};

export default InsuranceContent;
