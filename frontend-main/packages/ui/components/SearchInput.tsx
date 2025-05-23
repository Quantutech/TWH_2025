"use client";
import { ChangeEventHandler, FocusEventHandler, useState } from "react";
import {
  HStack,
  Input,
  Image,
  ResponsiveValue,
  ImageProps,
  StackProps,
  InputProps,
} from "@chakra-ui/react";

interface InputWithIconProps {
  icon?: any;
  placeholder: string;
  width?: ResponsiveValue<number | string | (string & {})>;
  imageProps?: ImageProps;
  containerProps?: StackProps;
  inputProps?: InputProps;
  height?: ResponsiveValue<number | string | (string & {})>;
  onfocus?: FocusEventHandler<HTMLInputElement> | undefined;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  value?: string;
}

const SearchInput: React.FC<InputWithIconProps> = ({
  icon,
  placeholder,
  width,
  imageProps,
  containerProps,
  inputProps,
  height,
  onfocus,
  onBlur,
  onChange,
  value,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <HStack
      w="full"
      spacing={2}
      bg="base.white.light"
      p={3}
      border={"1px solid"}
      borderColor={isFocused ? "secondary.300.light" : "secondary.100.light"}
      borderRadius={"12px"}
      transitionDuration={"300ms"}
      boxShadow={"none"}
      padding={"2px 12px"}
      {...containerProps}
    >
      <Image src={icon} color="gray.500" {...imageProps} />
      <Input
        placeholder={placeholder}
        fontSize="sm"
        border={"none"}
        outline={"none"}
        boxShadow={"none"}
        _focus={{
          border: "none !important",
          outline: "none !important",
          boxShadow: "none !important",
        }}
        value={value}
        onChange={onChange}
        onFocus={(e) => {
          if (onfocus) {
            onfocus(e);
          }
          setIsFocused(true);
        }}
        onBlur={(e) => {
          if (onBlur) {
            onBlur(e);
          }
          setIsFocused(false);
        }}
        _active={{
          border: "none !important",
          outline: "none !important",
          boxShadow: "none !important",
        }}
        w={width}
        h={height}
        {...inputProps}
      />
    </HStack>
  );
};

export default SearchInput;
