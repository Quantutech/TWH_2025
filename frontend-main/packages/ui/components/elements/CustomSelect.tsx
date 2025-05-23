"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Flex, FlexProps, Text, Input } from "@chakra-ui/react";
import AngleUpIcon from "../icons/AngleUpIcon";
import { CustomSelectOption } from "../../utils/type";

interface Props {
  label?: string;
  options: { value: string | number; label: string }[];
  placeholder?: string;
  containerProps?: FlexProps;
  isSearchable?: boolean;
  selectedOption?: CustomSelectOption;
  setSelectedOption?: Dispatch<SetStateAction<CustomSelectOption>>;
  selectProps?: FlexProps;
  optionClick?: (e: CustomSelectOption) => void;
}

const CustomSelect = ({
  label,
  options,
  placeholder,
  containerProps,
  isSearchable = false,
  selectedOption,
  setSelectedOption,
  selectProps,
  optionClick,
}: Props) => {
  const selectRef = useRef<HTMLDivElement | null>(null);
  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setTimeout(() => {
          setIsOptionOpen(false);
        }, 100);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef.current]);

  return (
    <Flex {...containerProps} flexDirection={"column"} gap={"6px"}>
      {label && (
        <Text color={"secondary.700.light"} fontWeight={500} fontSize={"14px"}>
          {label}
        </Text>
      )}
      <Flex
        ref={selectRef}
        pos={"relative"}
        bg={"base.white.light"}
        border={"1px solid"}
        borderColor={
          isOptionOpen ? "secondary.400.light" : "secondary.200.light"
        }
        borderRadius={"8px"}
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={"8px 12px"}
        height={"40px"}
        transitionDuration={"300ms"}
        _hover={{ borderColor: "secondary.400.light" }}
        onClick={() => {
          setIsOptionOpen(true);
        }}
        {...selectProps}
      >
        {isSearchable ? (
          <>
            <Input
              type="text"
              bg={"transparent"}
              color="secondary.400.light"
              placeholder={placeholder}
              padding={"0px"}
              border={"none !important"}
              outline={"none !important"}
              boxShadow={"none !important"}
              _focus={{
                border: "none !important",
                outline: "none !important",
                boxShadow: "none !important",
              }}
              _active={{
                border: "none !important",
                outline: "none !important",
                boxShadow: "none !important",
              }}
              _placeholder={{ color: "secondary.400.light" }}
              onChange={(e) => {
                if (setSelectedOption) {
                  setSelectedOption(undefined);
                }
                setSearchValue(e.target.value);
              }}
              value={selectedOption?.label}
            />
            <AngleUpIcon
              svg={{
                width: "16px",
                height: "16px",
                style: { transform: "rotate(180deg)" },
              }}
            />
          </>
        ) : (
          <>
            <Text
              bg={"transparent"}
              color="secondary.400.light"
              fontSize={"16px"}
            >
              {selectedOption?.label || placeholder}
            </Text>
            <AngleUpIcon
              svg={{
                width: "16px",
                height: "16px",
                style: { transform: "rotate(180deg)" },
              }}
            />
          </>
        )}
        {isOptionOpen && (
          <Flex
            pos={"absolute"}
            top={"38px"}
            left={"0px"}
            right={"0px"}
            flexDir={"column"}
            gap={"2px"}
            border={"1px solid"}
            borderColor={"secondary.200.light"}
            zIndex={100}
            borderRadius={"8px"}
            bg={"base.white.light"}
            padding={"8px 0px"}
            maxH={"200px"}
            overflow={"auto"}
          >
            {filteredOptions?.length > 0 ? (
              filteredOptions?.map((option) => {
                return (
                  <Text
                    key={option.value}
                    cursor={"pointer"}
                    userSelect={"none"}
                    padding={"4px 12px"}
                    bg={
                      selectedOption?.value === option.value
                        ? "secondary.200.light"
                        : "transparent"
                    }
                    _hover={{ bg: "secondary.200.light" }}
                    onClick={() => {
                      if (optionClick) {
                        optionClick(option);
                      }
                      if (setSelectedOption) {
                        setSelectedOption(option);
                      }
                      setTimeout(() => {
                        setIsOptionOpen(false);
                      }, 100);
                    }}
                  >
                    {option.label}
                  </Text>
                );
              })
            ) : (
              <Text
                padding={"4px 12px"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                No data found
              </Text>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default CustomSelect;
