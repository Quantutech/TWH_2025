import { Flex, FlexProps, Checkbox, Text } from "@chakra-ui/react";

interface Props {
  label?: string;
  placeholder?: string;
  onChange?:
    | ((event?: React.ChangeEvent<HTMLInputElement>) => void)
    | undefined;
  containerProps?: FlexProps;
}

const CustomCheckbox = ({
  label,
  placeholder,
  onChange,
  containerProps,
}: Props) => {
  return (
    <Flex {...containerProps} alignItems={"center"} gap={"6px"}>
      <Checkbox
        bg="base.white.light"
        borderColor="secondary.200.light"
        borderRadius={"6px"}
        color="secondary.400.light"
        placeholder={placeholder}
        onChange={onChange}
        fontSize={{ md: "14px", lg: "16px" }}
      />
      <Text color={"secondary.900.light"} fontWeight={500} fontSize={"14px"}>
        {label}
      </Text>
    </Flex>
  );
};

export default CustomCheckbox;
