"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Flex,
  FlexProps,
  Text,
  Input,
  FormControl,
  FormErrorMessage,
  Spinner,
  InputProps,
  FormLabelProps,
  FormLabel,
} from "@chakra-ui/react";
import AngleUpIcon from "../icons/AngleUpIcon";
import { ResponsePaginationData } from "../../utils/type";
import {
  Controller,
  ControllerRenderProps,
  FieldError,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { QueryMeta, useInfiniteQuery } from "@tanstack/react-query";

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
  }) => Promise<ResponsePaginationData<any[]>>;
  searchInputProps?: InputProps;
  onChange?: (
    option?: any,
    field?: ControllerRenderProps<FieldValues, string>
  ) => void;
  disabled?: boolean;
  labelProps?: FormLabelProps;
}

const FormAsyncSelect = ({
  placeholder,
  isSearchable = true,
  name,
  rules,
  queryKey,
  queryFn,
  containerProps,
  label,
  searchInputProps,
  onChange,
  disabled = false,
  labelProps,
}: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const selectRef = useRef<HTMLDivElement | null>(null);
  const hasInitialized = useRef(false);
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
    queryKey: [name === "country" ? "United States" : searchValue, ...queryKey],
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

  useEffect(() => {
    if (!hasInitialized.current && !searchValue) {
      hasInitialized.current = true;
      const defaultValue = control._defaultValues?.[name];
      if (defaultValue?.name) {
        setSearchValue(defaultValue.name);
      }
    }
  }, [control._defaultValues, name, searchValue]);

  const optionSide = useCallback(
    (field: ControllerRenderProps<FieldValues, string>) => {
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
                  field?.value?.id === option.id
                    ? "secondary.200.light"
                    : "transparent"
                }
                _hover={{ bg: "secondary.200.light" }}
                onClick={() => {
                  field.onChange(option);
                  setSearchValue("");
                  if (onChange) {
                    onChange(option, field);
                  }
                  setTimeout(() => {
                    setIsOptionOpen(false);
                  }, 100);
                }}
              >
                {option.name}
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
    },
    [isError, isLoading, isOptionOpen, allData, isFetchingNextPage]
  );

  return (
    <FormControl isInvalid={!!errors[name]}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          return (
            <Flex {...containerProps} flexDirection={"column"} gap={"0px"}>
              {label && (
                <FormLabel htmlFor={name} {...labelProps}>
                  {label}
                </FormLabel>
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
                padding={"8px 12px"}
                height={"40px"}
                transitionDuration={"300ms"}
                _hover={{
                  borderColor: errors[name] ? "#E53E3E" : "secondary.400.light",
                }}
                cursor={disabled ? "not-allowed" : undefined}
                onClick={() => {
                  if (!disabled) {
                    setIsOptionOpen(true);
                    setSearchValue("");
                  }
                }}
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
                        style: { transform: "rotate(180deg)" },
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
                {optionSide(field)}
              </Flex>
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

export default FormAsyncSelect;
