import { Icon, Text, HStack } from "@chakra-ui/react";
import { IconType } from "react-icons";
import React from "react";

interface Props {
  label: string;
  onClick?: () => void;
  textDecorationLine?: boolean;
  align?: "flex-start" | "flex-end" | "center";
  iconName?: IconType;
}

const TextButton = ({
  label,
  onClick,
  align = "center",
  textDecorationLine,
  iconName: IconComponent,
}: Props) => {
  return (
    <HStack alignItems={"center"} justifyContent={align} onClick={onClick}>
      {IconComponent && <Icon as={IconComponent} size="sm" mr={2} />}
      <Text
        textDecorationLine={textDecorationLine ? "underline" : "none"}
        fontWeight={"bold"}
        color={"black"}
        ml={1}
        cursor={"pointer"}
        textAlign={"center"}
      >
        {label}
      </Text>
    </HStack>
  );
};

export default TextButton;
