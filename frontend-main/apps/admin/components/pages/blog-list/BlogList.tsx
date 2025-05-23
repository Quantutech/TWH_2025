"use client";
import React, { useMemo, useState } from "react";
import Layout from "../../layout/admin-panel/Layout";
import {
  Box,
  Button,
  Flex,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { getBlogList } from "@repo/ui/utils/api";
import { useQuery } from "@tanstack/react-query";
import { getFormattedDateTime } from "@repo/ui/utils/helpers";
import Pagination from "@repo/ui/components/Pagination";
import ContentModal from "./modals/ContentModal";

const BlogList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenModalId, setIsOpenModalId] = useState<number | undefined>(
    undefined
  );
  const { data, isError, isLoading } = useQuery({
    queryKey: ["blogList", currentPage, 20],
    queryFn: (options) => {
      return getBlogList(
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
                  <Th>Tıtle</Th>
                  <Th>Content</Th>
                  <Th>Created At</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.data?.data?.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.title}</Td>
                    <Td>
                      {item?.contextUrl ? (
                        <Button
                          type="button"
                          fontWeight={500}
                          color={"secondary.950.light"}
                          fontSize={"14px"}
                          padding={0}
                          bg={"transparent"}
                          opacity={1}
                          _hover={{ bg: "transparent", opacity: "0.6" }}
                          _active={{ bg: "transparent", opacity: "0.6" }}
                          onClick={() => {
                            setIsOpenModalId(item.id);
                          }}
                        >
                          View
                        </Button>
                      ) : (
                        "-"
                      )}
                    </Td>
                    <Td>{getFormattedDateTime(item.createdAt.toString())}</Td>
                    <ContentModal
                      data={item}
                      activeModalId={isOpenModalId}
                      setActiveModalId={setIsOpenModalId}
                    />
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
  }, [data, isLoading, isError, isOpenModalId]);

  return (
    <Layout header="Blog List">
      <Box
        padding={"16px 24px"}
        border={"1px solid"}
        borderColor={"secondary.100.light"}
        borderRadius={"16px"}
        mt={4}
        backgroundColor={"base.white.light"}
      >
        <Text
          mr={"auto"}
          fontWeight={600}
          fontSize={"20px"}
          color={"secondary.950.light"}
        >
          Blog List
        </Text>

        {dataSide}
      </Box>
    </Layout>
  );
};

export default BlogList;
