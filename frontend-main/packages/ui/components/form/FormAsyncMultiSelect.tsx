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
import AngleUpIcon from "../icons/AngleUpIcon";
import { ResponseData, ResponsePaginationData } from "../../utils/type";
import {
  Controller,
  FieldError,
  useController,
  useFormContext,
} from "react-hook-form";
import { QueryMeta, useInfiniteQuery } from "@tanstack/react-query";
import CloseIcon from "../icons/CloseIcon";
import { colors } from "../../theme";

interface Props {
  label?: string;
  placeholder?: string;
  containerProps?: FlexProps;
  isSearchable?: boolean;
  name: string;
  rules?: Record<string, any>;
  queryKey: (number | string)[];
  queryFn: (potion: {
    queryKey: (string | number)[];
    signal: AbortSignal;
    pageParam: number;
    direction: string;
    meta: QueryMeta | undefined;
  }) => Promise<ResponsePaginationData<any[]>> | Promise<ResponseData<any[]>>;
  searchInputProps?: InputProps;
  disabled?: boolean;
  defaultValue?: any[];
}

const FormAsyncMultiSelect = ({
  placeholder,
  isSearchable = true,
  name,
  rules,
  queryKey,
  queryFn,
  containerProps,
  label,
  searchInputProps,
  disabled = false,
  defaultValue,
}: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { field } = useController({ control, name });

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

  useEffect(() => {
    if (defaultValue?.length) {
      setSelectedOptions(defaultValue);
    }
  }, [defaultValue]);

  const optionSide = useMemo(() => {
    if (isError && isOptionOpen) {
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
          zIndex={500}
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
    } else if (isLoading && isOptionOpen) {
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
          zIndex={500}
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
          zIndex={500}
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
                  const updatedOptions = selectedOptions.some(
                    (item) => item.id === option.id
                  )
                    ? selectedOptions.filter((item) => item.id !== option.id)
                    : [...selectedOptions, option];
                  setSelectedOptions(updatedOptions);
                  field.onChange(updatedOptions);
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
                  const updatedOptions = selectedOptions.some(
                    (item) => item.id === option.id
                  )
                    ? selectedOptions.filter((item) => item.id !== option.id)
                    : [...selectedOptions, option];
                  setSelectedOptions(updatedOptions);
                  field.onChange(updatedOptions);
                }}
              >
                {option.name || option.label}
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
    <FormControl isInvalid={!!errors[name]}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          return (
            <Flex {...containerProps} flexDirection={"column"} gap={"4px"}>
              {label && (
                <Text
                  color={"secondary.700.light"}
                  fontWeight={500}
                  fontSize={"14px"}
                >
                  {label}
                </Text>
              )}
              <Flex
                ref={selectRef}
                pos={"relative"}
                bg={"base.white.light"}
                border={"1px solid"}
                borderColor={
                  errors[name]
                    ? "#E53E3E"
                    : isOptionOpen
                      ? "secondary.400.light"
                      : "secondary.200.light"
                }
                boxShadow={errors[name] ? "0 0 0 1px #E53E3E" : undefined}
                borderRadius={"8px"}
                justifyContent={"space-between"}
                alignItems={"center"}
                padding={"0px 12px"}
                height={"40px"}
                transitionDuration={"300ms"}
                _hover={{
                  borderColor: errors[name] ? "#E53E3E" : "secondary.400.light",
                }}
                cursor={disabled ? "not-allowed" : undefined}
                onClick={() => {
                  if (!disabled) {
                    setIsOptionOpen(true);
                  }
                }}
              >
                {isSearchable ? (
                  <>
                    <Input
                      type="text"
                      width={"100%"}
                      bg={"transparent"}
                      color="text.base.placeholder.light"
                      placeholder={placeholder}
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
                      _placeholder={{ color: "text.base.placeholder.light" }}
                      onChange={(e) => {
                        field.onChange(null);
                        setSearchValue(e.target.value);
                      }}
                      value={searchValue || field.value?.name}
                      disabled={disabled}
                      {...searchInputProps}
                    />
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
                      {field?.value?.name || placeholder}
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
              {selectedOptions.length > 0 && (
                <Flex
                  width={"100%"}
                  alignItems={"center"}
                  flexWrap={"wrap"}
                  padding={"4px 0px"}
                  mr={"8px"}
                  gap={"8px"}
                >
                  {selectedOptions?.map((option) => {
                    return (
                      <Flex
                        key={option.id}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        whiteSpace={"nowrap"}
                        marginRight={"6px"}
                        p={"2px 8px"}
                        gap={"4px"}
                        bg={"grayScale.50.light"}
                        userSelect={"none"}
                        cursor={"default"}
                        border={"1px solid"}
                        borderColor={"grayScale.200.light"}
                        borderRadius={"999px"}
                      >
                        <Text
                          color={"grayScale.700.light"}
                          fontSize={"14px"}
                          fontWeight={"500"}
                        >
                          {option.name || option.label}
                        </Text>
                        <CloseIcon
                          svg={{
                            width: "12px",
                            height: "12px",
                            style: {
                              marginTop: "4px",
                              cursor: "pointer",
                              fill: colors.grayScale["700"].light,
                            },
                            onClick: () => {
                              const updatedOptions = selectedOptions.filter(
                                (item) => item.id !== option.id
                              );
                              setSelectedOptions(updatedOptions);
                              field.onChange(updatedOptions);
                            },
                          }}
                        />
                      </Flex>
                    );
                  })}
                </Flex>
              )}
            </Flex>
          );
        }}
      />
      <FormErrorMessage>
        {errors[name] && (errors[name] as FieldError).message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FormAsyncMultiSelect;
