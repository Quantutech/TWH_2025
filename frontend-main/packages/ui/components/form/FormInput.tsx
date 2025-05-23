import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
  IconButton,
  Input,
  InputGroup,
  InputGroupProps,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { Controller, FieldError, useFormContext } from "react-hook-form";

interface FormInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  rules?: Record<string, any>;
  type?: "text" | "email" | "password" | "number";
  disabled?: boolean;
  secureText?: boolean;
  onChange?: (value: string) => void;
  width?:
    | string
    | number
    | {
        base?: string | number;
        sm?: string | number;
        md?: string | number;
        lg?: string | number;
        xl?: string | number;
        "2xl"?: string | number;
      };
  height?: string | number;
  labelProps?: FormLabelProps;
  inputProps?: InputProps;
  isHttpsText?: boolean;
  containerProps?: InputGroupProps;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  placeholder = `...`,
  rules,
  type = "text",
  disabled = false,
  secureText = false,
  onChange,
  width,
  height,
  labelProps,
  inputProps,
  isHttpsText = false,
  containerProps,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [showPassword, setShowPassword] = useState(true);
  const [httpsTextInputFocused, setHttpsTextInputFocused] = useState(false);

  const handleHidePassword = () => setShowPassword(!showPassword);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldOnChange: (value: string) => void
  ) => {
    fieldOnChange(e.target.value);
    onChange && onChange(e.target.value);
  };

  return (
    <FormControl isInvalid={!!errors[name]} width={width} {...containerProps}>
      {label && (
        <FormLabel htmlFor={name} {...labelProps}>
          {label}
        </FormLabel>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <InputGroup alignItems={"center"}>
            {isHttpsText ? (
              <Flex
                width={"100%"}
                alignItems={"center"}
                outline={"2px solid transparent"}
                border={"1px solid"}
                borderColor={
                  httpsTextInputFocused ? "#3182ce" : "secondary.200.light"
                }
                outlineOffset={"2px"}
                borderRadius={"8px"}
                zIndex={httpsTextInputFocused ? 1 : undefined}
                boxShadow={
                  httpsTextInputFocused ? "0 0 0 1px #3182ce" : undefined
                }
                transitionDuration={"200ms"}
              >
                <Flex
                  justifyContent={"center"}
                  alignItems={"center"}
                  color={"secondary.900.light"}
                  paddingX={"14px"}
                  height={"40px"}
                  borderTopLeftRadius={"8px"}
                  borderBottomLeftRadius={"8px"}
                  userSelect={"none"}
                  borderRight={"1px solid"}
                  borderColor={"secondary.200.light"}
                  fontWeight={400}
                  fontSize={"16px"}
                >
                  https://
                </Flex>
                <Input
                  id={name}
                  {...field}
                  backgroundColor={"base.white.light"}
                  border={"none !important"}
                  outline={"none !important"}
                  boxShadow={"none !important"}
                  borderTopRightRadius={"8px"}
                  borderBottomRightRadius={"8px"}
                  placeholder={placeholder}
                  type={secureText && showPassword ? "password" : type}
                  isDisabled={disabled}
                  onChange={(e) => handleChange(e, field.onChange)}
                  onFocus={() => {
                    setHttpsTextInputFocused(true);
                  }}
                  onBlur={() => {
                    setHttpsTextInputFocused(false);
                  }}
                  height={height}
                  {...inputProps}
                />
              </Flex>
            ) : (
              <Input
                borderRadius={"8px"}
                backgroundColor={"base.white.light"}
                {...field}
                id={name}
                placeholder={placeholder}
                type={secureText && showPassword ? "password" : type}
                isDisabled={disabled}
                onChange={(e) => handleChange(e, field.onChange)}
                height={height}
                {...inputProps}
              />
            )}
            {secureText && (
              <InputRightElement>
                <IconButton
                  disabled={disabled}
                  aria-label="Toggle Password Visibility"
                  icon={!showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={handleHidePassword}
                  pt={"4px"}
                  variant="ghost"
                  _hover={{ bg: "none" }}
                  _active={{ bg: "none" }}
                />
              </InputRightElement>
            )}
          </InputGroup>
        )}
      />
      <FormErrorMessage>
        {errors[name] && (errors[name] as FieldError).message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
