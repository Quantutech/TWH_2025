"use client";

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
} from "@chakra-ui/react";
import { CSSProperties } from "react";
import { Controller, FieldError, useFormContext } from "react-hook-form";
import PhoneInput, { PhoneInputProps } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { colors } from "../../theme";

interface FormPhoneInputProps {
  name: string;
  label?: string;
  rules?: Record<string, any>;
  placeholder?: string;
  labelProps?: FormLabelProps;
  phoneInputProps?: Partial<PhoneInputProps>;
  inputStyle?: CSSProperties;
  buttonStyle?: CSSProperties;
  phoneInputContainerStyle?: CSSProperties;
}

const FormPhoneInput: React.FC<FormPhoneInputProps> = ({
  name,
  label,
  rules,
  placeholder = "Telefon numarası giriniz...",
  labelProps,
  phoneInputProps,
  inputStyle,
  buttonStyle,
  phoneInputContainerStyle,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl isInvalid={!!errors[name]}>
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
          <PhoneInput
            country="us"
            placeholder={placeholder}
            value={field.value || ""}
            onChange={(phone) => field.onChange(phone)}
            inputProps={{
              id: name,
            }}
            containerStyle={{
              width: "533px",
              border: errors[name] ? "1px solid #E53E3E" : "1px solid #E2E8F0",
              borderRadius: "8px",
              ...phoneInputContainerStyle,
            }}
            inputStyle={{
              width: "100%",
              height: "44px",
              borderRadius: "8px",
              border: "1px solid #E2E8F0",
              ...inputStyle,
            }}
            buttonStyle={{
              borderTopLeftRadius: "8px",
              borderBottomLeftRadius: "8px",
              border: "1px solid #E2E8F0",
              backgroundColor: colors.base.white.light,
              ...buttonStyle,
            }}
            {...phoneInputProps}
          />
        )}
      />

      <FormErrorMessage>
        {errors[name] && (errors[name] as FieldError).message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FormPhoneInput;
