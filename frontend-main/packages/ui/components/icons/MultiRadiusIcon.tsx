"use client";
import { Flex, FlexProps } from "@chakra-ui/react";
import { hexToRgba } from "../../utils/helpers";

interface Props {
  icon: React.JSX.Element;
  outLineColor: string;
  containerProps?: FlexProps;
}

const MultiRadiusIcon = ({ icon, outLineColor, containerProps }: Props) => {
  return (
    <Flex
      padding={"24px"}
      border={`1px solid ${outLineColor && hexToRgba(outLineColor, "0.2")}`}
      borderRadius={"50%"}
      {...containerProps}
    >
      <Flex
        padding={"24px"}
        border={`1px solid ${outLineColor && hexToRgba(outLineColor, "0.4")}`}
        borderRadius={"50%"}
      >
        <Flex
          padding={"24px"}
          border={`1px solid ${outLineColor && hexToRgba(outLineColor, "0.6")}`}
          borderRadius={"50%"}
        >
          <Flex
            padding={"24px"}
            border={`1px solid ${outLineColor && hexToRgba(outLineColor, "0.8")}`}
            borderRadius={"50%"}
          >
            <Flex
              padding={"24px"}
              border={`1px solid ${outLineColor && hexToRgba(outLineColor, "1")}`}
              borderRadius={"50%"}
            >
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                borderRadius={"10px"}
                width={"48px"}
                height={"48px"}
                border={"1px solid"}
                borderColor={`${outLineColor && hexToRgba(outLineColor, "1")}`}
              >
                {icon}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MultiRadiusIcon;
