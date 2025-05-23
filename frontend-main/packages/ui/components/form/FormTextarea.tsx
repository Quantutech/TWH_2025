import { FC } from "react";
import {
  Flex,
  FlexProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { Controller, FieldError, useFormContext } from "react-hook-form";

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  rules?: Record<string, any>;
  labelProps?: FormLabelProps;
  containerProps?: FlexProps;
  textareaProps?: TextareaProps;
}

const FormTextarea: FC<Props> = ({
  name,
  label,
  placeholder = `...`,
  rules,
  labelProps,
  containerProps,
  textareaProps,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl isInvalid={!!errors[name]}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <Flex {...containerProps} flexDirection={"column"} gap={"6px"}>
              {label && (
                <FormLabel htmlFor={name} {...labelProps}>
                  {label}
                </FormLabel>
              )}
              <Textarea
                bg="base.white.light"
                borderColor="secondary.200.light"
                color="#101828"
                placeholder={placeholder}
                {...field}
                fontSize={{ md: "14px", lg: "16px" }}
                {...textareaProps}
              />
            </Flex>
          </>
        )}
      />
      <FormErrorMessage>
        {errors[name] && (errors[name] as FieldError).message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FormTextarea;
