"use client";
import { useRef, useState } from "react";
import { Input, HStack } from "@chakra-ui/react";

interface DigitInputProps {
  onChange: (newValue: string) => void; // Dışarıya yeni değeri iletecek fonksiyon
}

const DigitInput = ({ onChange }: DigitInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [digits, setDigits] = useState(["", "", "", ""]);

  const handleChange = (index: number, inputValue: string) => {
    if (/^\d$/.test(inputValue)) {
      const newDigits = [...digits];
      newDigits[index] = inputValue;
      setDigits(newDigits);

      // Yeni değeri dışarıya ilet
      onChange(newDigits.join(""));

      if (index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (digits[index] === "") {
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      } else {
        const newDigits = [...digits];
        newDigits[index] = "";
        setDigits(newDigits);
        onChange(newDigits.join(""));
      }
    }
  };

  return (
    <HStack spacing={"6px"}>
      {digits.map((digit, index) => (
        <Input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          ref={(el) => (inputRefs.current[index] = el) as any}
          width="80px"
          height="88px"
          border={"2px solid"}
          textAlign="center"
          fontSize="48px"
          borderColor="primary.600.light"
          focusBorderColor="blue.500"
        />
      ))}
    </HStack>
  );
};

export default DigitInput;
