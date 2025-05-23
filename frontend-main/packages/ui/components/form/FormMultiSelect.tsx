"use client";
import { useEffect, useRef, useState } from "react";
import {
  Flex,
  FlexProps,
  Text,
  FormControl,
  FormErrorMessage,
  Checkbox,
} from "@chakra-ui/react";
import AngleUpIcon from "../icons/AngleUpIcon";
import {
  Controller,
  FieldError,
  useController,
  useFormContext,
} from "react-hook-form";
import CloseIcon from "../icons/CloseIcon";

interface Props {
  label?: string;
  placeholder?: string;
  containerProps?: FlexProps;
  name: string;
  rules?: Record<string, any>;
  disabled?: boolean;
  options: { value: string | number; label: string }[];
  defaultValue?: { value: string | number; label: string }[];
}

const FormMultiSelect = ({
  placeholder,
  name,
  rules,
  containerProps,
  label,
  disabled = false,
  options,
  defaultValue,
}: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { field } = useController({ control, name });

  const selectRef = useRef<HTMLDivElement | null>(null);
  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

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

  const handleSelectionChange = (option: {
    value: string | number;
    label: string;
  }) => {
    setSelectedOptions((prev) => {
      const isExist = prev.some((item) => item.value === option.value);
      const newOptions = isExist
        ? prev.filter((item) => item.value !== option.value)
        : [...prev, option];

      field.onChange(newOptions);
      return newOptions;
    });
  };

  useEffect(() => {
    if (defaultValue?.length) {
      setSelectedOptions(defaultValue);
    }
  }, [defaultValue]);

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
                <Text
                  userSelect={"none"}
                  cursor={"default"}
                  fontSize={"16px"}
                  fontWeight={500}
                  color={"#667085"}
                >
                  {placeholder}
                </Text>
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
                    zIndex={100}
                    borderRadius={"8px"}
                    bg={"base.white.light"}
                    padding={"8px 0px"}
                    maxH={"200px"}
                    overflow={"auto"}
                  >
                    {options.map((option) => (
                      <Flex
                        key={option.value}
                        alignItems={"center"}
                        transitionDuration={"300ms"}
                        _hover={{ bg: "secondary.50.light" }}
                      >
                        <Checkbox
                          marginLeft={"12px"}
                          onChange={() => handleSelectionChange(option)}
                          isChecked={selectedOptions.some(
                            (item) => item.value === option.value
                          )}
                        />
                        <Text
                          width={"100%"}
                          cursor={"pointer"}
                          userSelect={"none"}
                          padding={"4px 8px"}
                          onClick={() => handleSelectionChange(option)}
                        >
                          {option.label}
                        </Text>
                      </Flex>
                    ))}
                  </Flex>
                )}
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
                        key={option.value}
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
                        <Text>{option.label}</Text>
                        <CloseIcon
                          svg={{
                            width: "12px",
                            height: "12px",
                            style: {
                              marginTop: "4px",
                              cursor: "pointer",
                            },
                            onClick: () => {
                              setSelectedOptions((prev) => {
                                const newOptions = prev.filter(
                                  (item) => item.value !== option.value
                                );
                                field.onChange(newOptions);
                                return newOptions;
                              });
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

export default FormMultiSelect;
