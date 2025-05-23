import { Flex, FlexProps, Switch, Text } from "@chakra-ui/react";

interface Props {
  label?: string;
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  containerProps?: FlexProps;
  isChecked: boolean;
}

const CustomSwitch = ({
  label,
  onChange,
  containerProps,
  isChecked,
}: Props) => {
  return (
    <Flex
      {...containerProps}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      {label && (
        <Text color={"secondary.700.light"} fontWeight={500} fontSize={"14px"}>
          {label}
        </Text>
      )}
      <Switch
        variant={"customSwitch"}
        onChange={onChange}
        isChecked={isChecked}
      />
    </Flex>
  );
};

export default CustomSwitch;
