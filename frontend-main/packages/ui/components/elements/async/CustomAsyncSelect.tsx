"use client";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Flex, FlexProps, Text, Input, Spinner } from "@chakra-ui/react";
import {
  CustomAsyncSelectOption,
  ResponseData,
  ResponsePaginationData,
} from "../../../utils/type";
import AngleUpIcon from "../../icons/AngleUpIcon";
import { QueryMeta, useInfiniteQuery } from "@tanstack/react-query";

interface Props {
  label?: string;
  placeholder?: string;
  containerProps?: FlexProps;
  isSearchable?: boolean;
  selectedOption?: CustomAsyncSelectOption;
  setSelectedOption?: Dispatch<SetStateAction<CustomAsyncSelectOption>>;
  selectProps?: FlexProps;
  optionClick?: (e: CustomAsyncSelectOption) => void;
  queryKey: (number | string)[];
  queryFn: (potion: {
    queryKey: (string | number)[];
    signal: AbortSignal;
    pageParam: number;
    direction: string;
    meta: QueryMeta | undefined;
  }) => Promise<ResponsePaginationData<any[]>> | Promise<ResponseData<any[]>>;
}

const CustomAsyncSelect = ({
  label,
  placeholder,
  containerProps,
  isSearchable = false,
  selectedOption,
  setSelectedOption,
  selectProps,
  optionClick,
  queryKey,
  queryFn,
}: Props) => {
  const selectRef = useRef<HTMLDivElement | null>(null);
  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: [searchValue, ...queryKey],
    queryFn: (option) => {
      return queryFn?.(option) as Promise<ResponsePaginationData<any[]>>;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.data?.meta?.page;
      const totalPages = lastPage?.data?.meta?.totalPages;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: isOptionOpen,
    retry: false,
  });

  const allData: any[] = useMemo(() => {
    if (!data?.pages?.length) return [];
    return data.pages.reduce((acc: any, page: any) => {
      if (page.data.data) {
        return [...acc, ...page.data.data];
      } else if (page?.data) {
        return page?.data;
      }
    }, []);
  }, [data]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setTimeout(() => {
          setIsOptionOpen(false);
        }, 100);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef.current]);

  const optionSide = useMemo(() => {
    if (isError) {
      return (
        <Flex
          pos={"absolute"}
          top={"38px"}
          left={"0px"}
          right={"0px"}
          flexDir={"column"}
          gap={"2px"}
          border={"1px solid"}
          borderColor={"secondary.200.light"}
          zIndex={100}
          borderRadius={"8px"}
          bg={"base.white.light"}
          padding={"8px 0px"}
          maxH={"200px"}
          overflow={"auto"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          No data found
        </Flex>
      );
    } else if (isLoading) {
      return (
        <Flex
          pos={"absolute"}
          top={"38px"}
          left={"0px"}
          right={"0px"}
          flexDir={"column"}
          gap={"2px"}
          border={"1px solid"}
          borderColor={"secondary.200.light"}
          zIndex={100}
          borderRadius={"8px"}
          bg={"base.white.light"}
          padding={"8px 0px"}
          maxH={"200px"}
          overflow={"auto"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Spinner color="secondary.500.light" />
        </Flex>
      );
    } else if ((isOptionOpen && allData?.length > 0) || isFetchingNextPage) {
      return (
        <Flex
          pos={"absolute"}
          top={"38px"}
          left={"0px"}
          right={"0px"}
          flexDir={"column"}
          gap={"2px"}
          border={"1px solid"}
          borderColor={"secondary.200.light"}
          zIndex={100}
          borderRadius={"8px"}
          bg={"base.white.light"}
          padding={"8px 0px"}
          maxH={"200px"}
          overflow={"auto"}
          onScroll={(e) => {
            const target = e.currentTarget;
            if (
              target.scrollHeight - target.scrollTop ===
              target.clientHeight
            ) {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }
          }}
        >
          {allData.map((option) => (
            <Text
              key={option.value}
              cursor={"pointer"}
              userSelect={"none"}
              padding={"4px 12px"}
              bg={
                selectedOption?.id === option.id
                  ? "secondary.200.light"
                  : "transparent"
              }
              _hover={{ bg: "secondary.200.light" }}
              onClick={() => {
                if (optionClick) {
                  optionClick(option);
                }
                if (setSelectedOption) {
                  setSelectedOption({
                    value: option?.id || option?.value,
                    label: option?.name || option?.label,
                  });
                }
                setTimeout(() => {
                  setIsOptionOpen(false);
                }, 100);
              }}
            >
              {option?.label || option?.name}
            </Text>
          ))}
          {isFetchingNextPage && (
            <Flex width={"100%"} justifyContent={"center"}>
              <Spinner
                color="secondary.500.light"
                width={"24px"}
                minWidth={"24px"}
                height={"24px"}
                minHeight={"24px"}
              />
            </Flex>
          )}
        </Flex>
      );
    }
  }, [isError, isLoading, isOptionOpen, allData, isFetchingNextPage]);

  return (
    <Flex {...containerProps} flexDirection={"column"} gap={"6px"}>
      {label && (
        <Text color={"secondary.700.light"} fontWeight={500} fontSize={"14px"}>
          {label}
        </Text>
      )}
      <Flex
        ref={selectRef}
        pos={"relative"}
        bg={"base.white.light"}
        border={"1px solid"}
        borderColor={
          isOptionOpen ? "secondary.400.light" : "secondary.200.light"
        }
        borderRadius={"8px"}
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={"8px 12px"}
        height={"40px"}
        transitionDuration={"300ms"}
        _hover={{ borderColor: "secondary.400.light" }}
        onClick={() => {
          setIsOptionOpen(true);
        }}
        {...selectProps}
      >
        {isSearchable ? (
          <>
            <Input
              type="text"
              bg={"transparent"}
              color="secondary.400.light"
              placeholder={placeholder}
              padding={"0px"}
              border={"none !important"}
              outline={"none !important"}
              boxShadow={"none !important"}
              _focus={{
                border: "none !important",
                outline: "none !important",
                boxShadow: "none !important",
              }}
              _active={{
                border: "none !important",
                outline: "none !important",
                boxShadow: "none !important",
              }}
              _placeholder={{ color: "secondary.400.light" }}
              onChange={(e) => {
                if (setSelectedOption) {
                  setSelectedOption(undefined);
                }
                setSearchValue(e.target.value);
              }}
              value={selectedOption?.label || selectedOption?.name || ""}
            />
            <AngleUpIcon
              svg={{
                width: "16px",
                height: "16px",
                style: { transform: "rotate(180deg)" },
              }}
            />
          </>
        ) : (
          <>
            <Text bg={"transparent"} color="secondary.400.light">
              {selectedOption?.name || selectedOption?.label || placeholder}
            </Text>
            <AngleUpIcon
              svg={{
                width: "16px",
                height: "16px",
                style: { transform: "rotate(180deg)" },
              }}
            />
          </>
        )}
        {optionSide}
      </Flex>
    </Flex>
  );
};

export default CustomAsyncSelect;
