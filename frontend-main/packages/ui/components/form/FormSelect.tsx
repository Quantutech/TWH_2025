"use client";
import { useEffect, useRef, useState } from "react";
import {
  Flex,
  FlexProps,
  Text,
  Input,
  FormControl,
  FormErrorMessage,
  InputProps,
  TextProps,
  FormLabel,
  FormLabelProps,
} from "@chakra-ui/react";
import AngleUpIcon from "../icons/AngleUpIcon";
import {
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
  useFormContext,
} from "react-hook-form";

interface Props {
  label?: string;
  options: { value: string | number; label: string; disabled?: boolean }[];
  placeholder?: string;
  containerProps?: FlexProps;
  isSearchable?: boolean;
  name: string;
  rules?: Record<string, any>;
  searchInputProps?: InputProps | TextProps;
  disabled?: boolean;
  onOptionClick?: (option: {
    value: string | number;
    label: string;
    disabled?: boolean;
  }) => void;
  labelProps?: FormLabelProps;
}

const FormSelect = ({
  label,
  options,
  placeholder,
  containerProps,
  isSearchable = false,
  name,
  rules,
  searchInputProps,
  disabled = false,
  onOptionClick,
  labelProps,
}: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const selectRef = useRef<HTMLDivElement | null>(null);
  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

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
                opacity={disabled ? 0.5 : 1}
                cursor={disabled ? "not-allowed" : "pointer"}
                _hover={{
                  borderColor: errors[name] ? "#E53E3E" : "secondary.400.light",
                }}
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
                        setSearchValue(e.target.value);
                      }}
                      value={field?.value?.label}
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
                    <Text
                      bg={"transparent"}
                      color="secondary.400.light"
                      {...searchInputProps}
                    >
                      {field?.value?.label || placeholder}
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
                {isOptionOpen && (
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
                    overflow={"auto"}
                    maxH={"200px"}
                  >
                    {filteredOptions?.length > 0 ? (
                      filteredOptions?.map((option) => {
                        const isSelected = field?.value?.value === option.value;
                        return (
                          <Text
                            key={option.value}
                            cursor={option.disabled ? "not-allowed" : "pointer"}
                            userSelect={"none"}
                            padding={"4px 12px"}
                            bg={
                              isSelected ? "secondary.200.light" : "transparent"
                            }
                            _hover={
                              option.disabled
                                ? {}
                                : { bg: "secondary.200.light" }
                            }
                            opacity={option.disabled ? 0.5 : 1}
                            pointerEvents={option.disabled ? "none" : "auto"}
                            onClick={() => {
                              if (onOptionClick) {
                                onOptionClick(option);
                              }
                              if (!option.disabled) {
                                field.onChange(option);
                                setTimeout(() => {
                                  setIsOptionOpen(false);
                                }, 100);
                              }
                            }}
                          >
                            {option.label}
                          </Text>
                        );
                      })
                    ) : (
                      <Text
                        padding={"4px 12px"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        No data found
                      </Text>
                    )}
                  </Flex>
                )}
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

export default FormSelect;
