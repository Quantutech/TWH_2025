import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { MouseEventHandler, useRef, useEffect, useState } from "react";
import { colors } from "../../theme";

interface Props {
  children: React.ReactNode;
  sliderTitleComponent?: React.ReactNode;
  navigationButtonTopSideComponent?: React.ReactNode;
}

const Slider = ({
  children,
  sliderTitleComponent,
  navigationButtonTopSideComponent,
}: Props) => {
  const [childrenWidths, setChildrenWidths] = useState<number[]>([0]);
  const childrenRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [clickedIndex, setClickedIndex] = useState(0);
  const childArray = React.Children.toArray(children);

  useEffect(() => {
    childrenRefs.current = childArray.map(
      (_, i) => childrenRefs.current[i] || null
    );

    const timer = setTimeout(() => {
      const widths = childrenRefs.current.map((ref) => {
        const width = ref?.getBoundingClientRect().width || 0;
        return width;
      });
      setChildrenWidths(widths);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleLeftArrowClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (clickedIndex > 0) {
      setClickedIndex((prev) => prev - 1);
    }
  };

  const handleRightClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (clickedIndex < childArray.length - 1) {
      setClickedIndex((prev) => prev + 1);
      return;
    }
  };

  const calculateTransform = () => {
    let totalWidth = 0;
    for (let i = 0; i < clickedIndex; i++) {
      totalWidth += childrenWidths[i] || 0;
    }
    return totalWidth + clickedIndex * 12;
  };

  return (
    <Flex flexDirection={"column"} gap="24px">
      <Flex alignItems="center" flexDirection={{ base: "column", sm: "row" }}>
        <Box>{sliderTitleComponent ?? <></>}</Box>
        <Flex
          flexDirection={{ base: "row", sm: "column" }}
          marginLeft={{ base: "0px", sm: "auto" }}
          gap={{ base: "6px", md: "12px" }}
          justifyContent={{ base: "space-between", md: undefined }}
          w={{ base: "100%", sm: undefined }}
          maxW={{ base: "100%", sm: "130px" }}
        >
          {navigationButtonTopSideComponent ?? <></>}
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Button
              type="button"
              onClick={handleLeftArrowClick}
              isDisabled={clickedIndex === 0}
              bg={colors.base.white.light}
              border="1px solid"
              width={{ base: "40px", md: "56px" }}
              height={{ base: "40px", md: "56px" }}
              padding={"0px"}
              borderRadius={"50%"}
              borderColor="secondary.100.light"
              _hover={{ bg: "secondary.50.light" }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.56994 18.8201C9.37994 18.8201 9.18994 18.7501 9.03994 18.6001L2.96994 12.5301C2.67994 12.2401 2.67994 11.7601 2.96994 11.4701L9.03994 5.40012C9.32994 5.11012 9.80994 5.11012 10.0999 5.40012C10.3899 5.69012 10.3899 6.17012 10.0999 6.46012L4.55994 12.0001L10.0999 17.5401C10.3899 17.8301 10.3899 18.3101 10.0999 18.6001C9.95994 18.7501 9.75994 18.8201 9.56994 18.8201Z"
                  fill={colors.secondary["600"].light}
                />
                <path
                  d="M20.5 12.75H3.67004C3.26004 12.75 2.92004 12.41 2.92004 12C2.92004 11.59 3.26004 11.25 3.67004 11.25H20.5C20.91 11.25 21.25 11.59 21.25 12C21.25 12.41 20.91 12.75 20.5 12.75Z"
                  fill={colors.secondary["600"].light}
                />
              </svg>
            </Button>
            <Button
              type="button"
              onClick={handleRightClick}
              isDisabled={clickedIndex === childArray.length - 1}
              bg={colors.base.white.light}
              border="1px solid"
              width={{ base: "40px", md: "56px" }}
              height={{ base: "40px", md: "56px" }}
              padding={"0px"}
              borderRadius={"50%"}
              borderColor="secondary.100.light"
              _hover={{ bg: "secondary.50.light" }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.43 18.8201C14.24 18.8201 14.05 18.7501 13.9 18.6001C13.61 18.3101 13.61 17.8301 13.9 17.5401L19.44 12.0001L13.9 6.46012C13.61 6.17012 13.61 5.69012 13.9 5.40012C14.19 5.11012 14.67 5.11012 14.96 5.40012L21.03 11.4701C21.32 11.7601 21.32 12.2401 21.03 12.5301L14.96 18.6001C14.81 18.7501 14.62 18.8201 14.43 18.8201Z"
                  fill={colors.secondary["600"].light}
                />
                <path
                  d="M20.33 12.75H3.5C3.09 12.75 2.75 12.41 2.75 12C2.75 11.59 3.09 11.25 3.5 11.25H20.33C20.74 11.25 21.08 11.59 21.08 12C21.08 12.41 20.74 12.75 20.33 12.75Z"
                  fill={colors.secondary["600"].light}
                />
              </svg>
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex overflow={"hidden"}>
        <Flex
          gap={"12px"}
          transform={`translateX(-${calculateTransform()}px)`}
          transitionDuration={"300ms"}
        >
          {React.Children.map(children, (child, index) => (
            <Box
              key={index}
              display="inline-block"
              overflow={"hidden"}
              ref={(el) => {
                childrenRefs.current[index] = el;
              }}
            >
              {child}
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Slider;
