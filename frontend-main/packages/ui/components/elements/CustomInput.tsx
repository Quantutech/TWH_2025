"use client";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Flex,
  FlexProps,
  Text,
  Input,
  InputProps,
  Box,
} from "@chakra-ui/react";
import { ChangeEventHandler, useMemo, useState } from "react";

interface Props {
  label?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  containerProps?: FlexProps;
  inputProps?: InputProps;
  type?: string;
}

const CustomInput = ({
  label,
  placeholder,
  onChange,
  containerProps,
  inputProps,
  type = "text",
}: Props) => {
  const [showPasswordEye, setShowPasswordEye] = useState(false);

  const passwordIcon = useMemo(() => {
    if (type === "password" && showPasswordEye) {
      return (
        <ViewOffIcon
          pos={"absolute"}
          right={"10px"}
          top={"12px"}
          zIndex={100}
          cursor={"pointer"}
          onClick={() => {
            setShowPasswordEye(false);
          }}
        />
      );
    } else if (type === "password" && !showPasswordEye) {
      return (
        <ViewIcon
          pos={"absolute"}
          right={"10px"}
          top={"12px"}
          zIndex={100}
          cursor={"pointer"}
          onClick={() => {
            setShowPasswordEye(true);
          }}
        />
      );
    }
  }, [type, showPasswordEye]);

  const inputType = type === "password" && showPasswordEye ? "text" : type;

  return (
    <Flex {...containerProps} flexDirection={"column"} gap={"6px"}>
      {label && (
        <Text color={"secondary.700.light"} fontWeight={500} fontSize={"14px"}>
          {label}
        </Text>
      )}
      <Box pos={"relative"}>
        <Input
          type={inputType}
          bg="base.white.light"
          borderColor="secondary.200.light"
          color="#101828"
          placeholder={placeholder}
          onChange={onChange}
          fontSize={{ md: "14px", lg: "16px" }}
          _placeholder={{ color: "#667085" }}
          paddingRight={type === "password" ? "40px" : "0px"}
          {...inputProps}
        />
        {passwordIcon}
      </Box>
    </Flex>
  );
};

export default CustomInput;
