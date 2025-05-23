import {
  Checkbox,
  FormControl,
  FormControlProps,
  FormLabel,
  FormLabelProps,
  InputGroup,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface FormInputProps {
  name: string;
  label?: string | ReactElement;
  rules?: Record<string, any>;
  disabled?: boolean;
  secureText?: boolean;
  labelProps?: FormLabelProps;
  formControlProps?: FormControlProps;
}

const FormCheckbox: React.FC<FormInputProps> = ({
  name,
  label,
  rules,
  labelProps,
  formControlProps,
  disabled,
}) => {
  const {
    control,
    formState: { errors },
    clearErrors,
  } = useFormContext();
  const modifiedName = name.split(".")[0] || "";
  return (
    <FormControl
      display={"flex"}
      gap={"6px"}
      alignItems={"center"}
      isInvalid={!!errors[modifiedName]}
      {...formControlProps}
    >
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <InputGroup maxW={"16px"}>
            <Checkbox
              border={"1px solid"}
              borderColor={"secondary.200.light"}
              borderRadius={"4px"}
              outline={"none"}
              shadow={"none"}
              id={name}
              type={"checkbox"}
              isDisabled={disabled}
              isChecked={field.value}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                clearErrors(modifiedName);
              }}
            />
          </InputGroup>
        )}
      />
      {label && (
        <FormLabel
          htmlFor={name}
          color={"secondary.700.light"}
          fontSize={"14px"}
          margin={0}
          {...labelProps}
        >
          {label}
        </FormLabel>
      )}
    </FormControl>
  );
};

export default FormCheckbox;
