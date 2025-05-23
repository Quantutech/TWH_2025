import {
  Flex,
  FlexProps,
  Textarea,
  Text,
  TextareaProps,
} from "@chakra-ui/react";
import { ChangeEventHandler } from "react";

interface Props {
  label?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined;
  containerProps?: FlexProps;
  textAreaProps?: TextareaProps;
}

const CustomTextarea = ({
  label,
  placeholder,
  onChange,
  containerProps,
  textAreaProps,
}: Props) => {
  return (
    <Flex {...containerProps} flexDirection={"column"} gap={"6px"}>
      {label && (
        <Text color={"secondary.700.light"} fontWeight={500} fontSize={"14px"}>
          {label}
        </Text>
      )}
      <Textarea
        bg="base.white.light"
        borderColor="secondary.200.light"
        color="#101828"
        placeholder={placeholder}
        onChange={onChange}
        fontSize={{ md: "14px", lg: "16px" }}
        {...textAreaProps}
      />
    </Flex>
  );
};

export default CustomTextarea;
