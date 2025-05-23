import { ChangeEventHandler } from "react";
import { Flex, FlexProps, Text, TextareaProps } from "@chakra-ui/react";
import PhoneInput, { CountryData } from "react-phone-input-2";
import { colors } from "../../theme";

interface Props {
  label?: string;
  placeholder?: string;
  onChange?: (
    value: string,
    data: CountryData | {},
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ) => void;
  containerProps?: FlexProps;
  textAreaProps?: TextareaProps;
}

const CustomPhoneInput = ({
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
      <PhoneInput
        country="us"
        placeholder={placeholder}
        specialLabel=""
        containerStyle={{ width: "100%" }}
        inputStyle={{
          width: "100%",
          height: "40px",
          padding: "0px 16px",
          borderRadius: "8px",
          border: "1px solid",
          borderColor: colors.secondary["200"].light,
          outline: "1px solid transparent",
          color: "#101828",
          transitionDuration: "300ms",
        }}
        onFocus={(e) => (e.target.style.outline = "1px solid #3182ce")}
        onBlur={(e) => (e.target.style.outline = "1px solid transparent")}
        onChange={onChange}
      />
    </Flex>
  );
};

export default CustomPhoneInput;
