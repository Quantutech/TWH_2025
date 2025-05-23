"use client";
import { Button, Flex, FlexProps, Text, useBreakpoint } from "@chakra-ui/react";
import { colors } from "../theme";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  containerProps?: FlexProps;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  containerProps,
}: PaginationProps) => {
  const breakpointValue = useBreakpoint();
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = breakpointValue === "base" ? 2 : 5;

    pages.push(
      <Button
        type="button"
        key="prev"
        cursor={currentPage === 1 ? "not-allowed" : "pointer"}
        opacity={currentPage === 1 ? 0.5 : 1}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return currentPage > 1 && onPageChange(currentPage - 1);
        }}
        color="secondary.900.light"
        fontSize="14px"
        fontWeight={500}
        p={{ base: "0px", md: "0px 8px" }}
        border={"1px solid"}
        borderColor={"secondary.100.light"}
        borderRadius={"8px"}
        bg={"base.white.light"}
        mr={{ base: "0", md: "auto" }}
        _hover={{
          bg: "secondary.100.light",
        }}
        _active={{
          bg: "secondary.100.light",
        }}
      >
        <svg
          style={{ minWidth: "12px", minHeight: "12px" }}
          width="14"
          height="15"
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.8333 7.49999H1.16663M1.16663 7.49999L6.99996 13.3333M1.16663 7.49999L6.99996 1.66666"
            stroke={colors.secondary["900"].light}
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <Text
          display={{ base: "none", md: "block" }}
          ml={{ base: "0px", md: "6px" }}
        >
          Previous
        </Text>
      </Button>
    );

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(
        <Button
          type="button"
          key={1}
          cursor="pointer"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return onPageChange(1);
          }}
          bg={currentPage === 1 ? "secondary.100.light" : "transparent"}
          color={"secondary.950.light"}
          borderRadius="8px"
          p={"0px"}
          w={{ base: "32px", md: "40px" }}
          minW={{ base: "32px", md: "40px" }}
          h={{ base: "32px", md: "40px" }}
          minH={{ base: "32px", md: "40px" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize={{ base: "12px", md: "14px" }}
          fontWeight={500}
          _hover={{
            bg: "secondary.100.light",
          }}
          _active={{
            bg: "secondary.100.light",
          }}
        >
          1
        </Button>
      );

      if (startPage > 2) {
        pages.push(
          <Text key="dots1" color="secondary.600.light" px={2}>
            ...
          </Text>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          type="button"
          key={i}
          cursor="pointer"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return onPageChange(i);
          }}
          bg={currentPage === i ? "secondary.100.light" : "transparent"}
          color={"secondary.950.light"}
          borderRadius="8px"
          p={"0px"}
          w={{ base: "32px", md: "40px" }}
          minW={{ base: "32px", md: "40px" }}
          h={{ base: "32px", md: "40px" }}
          minH={{ base: "32px", md: "40px" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize={{ base: "12px", md: "14px" }}
          fontWeight={500}
          _hover={{
            bg: "secondary.100.light",
          }}
          _active={{
            bg: "secondary.100.light",
          }}
        >
          {i}
        </Button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <Text key="dots2" color="secondary.600.light" px={2}>
            ...
          </Text>
        );
      }
      pages.push(
        <Button
          type="button"
          key={totalPages}
          cursor="pointer"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return onPageChange(totalPages);
          }}
          bg={
            currentPage === totalPages ? "secondary.100.light" : "transparent"
          }
          color={"secondary.950.light"}
          borderRadius="8px"
          p={"0px"}
          w={{ base: "32px", md: "40px" }}
          minW={{ base: "32px", md: "40px" }}
          h={{ base: "32px", md: "40px" }}
          minH={{ base: "32px", md: "40px" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize={{ base: "12px", md: "14px" }}
          fontWeight={500}
          _hover={{
            bg: "secondary.100.light",
          }}
          _active={{
            bg: "secondary.100.light",
          }}
        >
          {totalPages}
        </Button>
      );
    }

    pages.push(
      <Button
        key="next"
        cursor={currentPage === totalPages ? "not-allowed" : "pointer"}
        opacity={currentPage === totalPages ? 0.5 : 1}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return currentPage < totalPages && onPageChange(currentPage + 1);
        }}
        color="secondary.900.light"
        fontSize="14px"
        fontWeight={500}
        border={"1px solid"}
        ml={{ base: "0", md: "auto" }}
        p={{ base: "0px", md: "0px 8px" }}
        borderColor={"secondary.100.light"}
        borderRadius={"8px"}
        bg={"base.white.light"}
        _hover={{
          bg: "secondary.100.light",
        }}
        _active={{
          bg: "secondary.100.light",
        }}
      >
        <Text
          display={{ base: "none", md: "block" }}
          mr={{ base: "0px", md: "6px" }}
        >
          Next
        </Text>
        <svg
          style={{ minWidth: "12px", minHeight: "12px" }}
          width="14"
          height="15"
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.16667 7.49999H12.8333M12.8333 7.49999L7 1.66666M12.8333 7.49999L7 13.3333"
            stroke={colors.secondary["900"].light}
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Button>
    );

    return pages;
  };

  return (
    <Flex
      width={"100%"}
      gap={{ base: "8px", md: "16px" }}
      alignItems="center"
      justifyContent="center"
      px={0}
      {...containerProps}
    >
      {renderPageNumbers()}
    </Flex>
  );
};

export default Pagination;
