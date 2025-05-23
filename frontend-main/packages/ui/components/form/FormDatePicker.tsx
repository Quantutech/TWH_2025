import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  FormLabelProps,
} from "@chakra-ui/react";
import { Controller, FieldError, useFormContext } from "react-hook-form";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import DateIcon from "../icons/DateIcon";

interface FormDatePickerProps {
  name: string;
  label?: string;
  placeholder?: string;
  rules?: Record<string, any>;
  disabled?: boolean;
  labelProps?: FormLabelProps;
}

const FormDatePicker: React.FC<FormDatePickerProps> = ({
  name,
  label,
  placeholder = "Select Date",
  rules,
  disabled = false,
  labelProps,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl isInvalid={!!errors[name]}>
      <FormLabel htmlFor={name} {...labelProps}>
        {label}
      </FormLabel>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <InputGroup zIndex={500} position={"relative"}>
            <SingleDatepicker
              date={new Date(field?.value)}
              onDateChange={(date) => {
                return field.onChange(date);
              }}
              disabled={disabled}
              configs={{
                dateFormat: "MM-dd-yyyy",
              }}
              propsConfigs={{
                inputProps: {
                  placeholder,
                  id: name,
                },
                triggerBtnProps: {
                  width: "100%",
                  bg: "transparent",
                  justifyContent: "flex-start",
                  border: "1px solid",
                  borderColor: "secondary.200.light",
                  color: "secondary.950.light",
                  fontWeight: "500",
                  _hover: {
                    bg: "none",
                    border: "1px solid",
                    borderColor: "secondary.300.light",
                  },
                },
              }}
              {...field}
            />
            <DateIcon
              svg={{
                width: "24px",
                height: "24px",
                style: {
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  zIndex: -1,
                },
              }}
            />
          </InputGroup>
        )}
      />
      <FormErrorMessage>
        {errors[name] && (errors[name] as FieldError).message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FormDatePicker;
