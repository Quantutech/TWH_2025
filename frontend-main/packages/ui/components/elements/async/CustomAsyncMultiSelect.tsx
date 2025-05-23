"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Flex,
  FlexProps,
  Text,
  Input,
  FormControl,
  FormErrorMessage,
  Spinner,
  InputProps,
  Checkbox,
} from "@chakra-ui/react";
import { QueryMeta, useInfiniteQuery } from "@tanstack/react-query";
import { ResponsePaginationData } from "../../../utils/type";
import AngleUpIcon from "../../icons/AngleUpIcon";
import CloseIcon from "../../icons/CloseIcon";

interface Props {
  label?: string;
  placeholder?: string;
  containerProps?: FlexProps;
  isSearchable?: boolean;
  queryKey: (number | string)[];
  queryFn: (potion: {
    queryKey: (string | number)[];
    signal: AbortSignal;
    pageParam: number;
    direction: string;
    meta: QueryMeta | undefined;
  }) => Promise<ResponsePaginationData<any[]>>;
  searchInputProps?: InputProps;
  disabled?: boolean;
}

const CustomAsyncMultiSelect = ({
  placeholder,
  isSearchable = true,
  queryKey,
  queryFn,
  containerProps,
  label,
  searchInputProps,
  disabled = false,
}: Props) => {
  const selectRef = useRef<HTMLDivElement | null>(null);
  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

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
      return queryFn?.(option);
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

  const allData = useMemo(() => {
    if (!data?.pages?.length) return [];
    return data.pages.reduce((acc: any, page: ResponsePaginationData<any>) => {
      return [...acc, ...page.data.data];
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
            <Flex
              key={option.value}
              alignItems={"center"}
              transitionDuration={"300ms"}
              _hover={{ bg: "secondary.50.light" }}
            >
              <Checkbox
                marginLeft={"12px"}
                onChange={() => {
                  setSelectedOptions((prev) => {
                    const isExist = prev.some((item) => item.id === option.id);
                    if (isExist) {
                      return prev.filter((item) => item.id !== option.id);
                    } else {
                      return [...prev, option];
                    }
                  });
                }}
                isChecked={selectedOptions.some(
                  (item) => item.id === option.id
                )}
              />
              <Text
                width={"100%"}
                cursor={"pointer"}
                userSelect={"none"}
                padding={"4px 8px"}
                onClick={() => {
                  setSelectedOptions((prev) => {
                    const isExist = prev.some((item) => item.id === option.id);
                    if (isExist) {
                      return prev.filter((item) => item.id !== option.id);
                    } else {
                      return [...prev, option];
                    }
                  });
                }}
              >
                {option.name}
              </Text>
            </Flex>
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
  }, [
    isError,
    isLoading,
    isOptionOpen,
    allData,
    isFetchingNextPage,
    selectedOptions,
  ]);

  return (
    <Flex {...containerProps} flexDirection={"column"} gap={"4px"}>
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
        padding={"0px 12px"}
        height={"40px"}
        transitionDuration={"300ms"}
        _hover={{ borderColor: "secondary.400.light" }}
        cursor={disabled ? "not-allowed" : undefined}
        onClick={() => {
          if (!disabled) {
            setIsOptionOpen(true);
          }
        }}
      >
        {isSearchable ? (
          <>
            <Flex
              width={"100%"}
              alignItems={"center"}
              height={"40px"}
              overflowY={"auto"}
              flexWrap={"wrap"}
              padding={"4px 0px"}
              mr={"20px"}
              css={{
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {selectedOptions?.map((option) => {
                return (
                  <Flex
                    key={option.id}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    whiteSpace={"nowrap"}
                    marginRight={"6px"}
                    bg={"secondary.100.light"}
                    borderRadius={"4px"}
                    px={"6px"}
                    gap={"4px"}
                    userSelect={"none"}
                    cursor={"default"}
                  >
                    <Text>{option.name}</Text>
                    <CloseIcon
                      svg={{
                        width: "12px",
                        height: "12px",
                        style: {
                          marginTop: "4px",
                          cursor: "pointer",
                        },
                        onClick: () => {
                          setSelectedOptions((prev) =>
                            prev.filter((item) => item.id !== option.id)
                          );
                        },
                      }}
                    />
                  </Flex>
                );
              })}
              <Input
                type="text"
                width={selectedOptions?.length > 0 ? "90px" : "100%"}
                bg={"transparent"}
                color="secondary.400.light"
                placeholder={
                  selectedOptions?.length > 0 ? "Search..." : placeholder
                }
                padding={"0px"}
                height={"30px"}
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
                  setSearchValue(e.target.value);
                }}
                value={searchValue}
                disabled={disabled}
                {...searchInputProps}
              />
            </Flex>

            <AngleUpIcon
              svg={{
                width: "16px",
                height: "16px",
                style: {
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%) rotate(180deg)",
                },
              }}
            />
          </>
        ) : (
          <>
            <Text bg={"transparent"} color="secondary.400.light">
              {placeholder}
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

export default CustomAsyncMultiSelect;
