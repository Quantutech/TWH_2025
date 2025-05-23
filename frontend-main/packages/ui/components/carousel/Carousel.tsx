"use client";
import { useCallback } from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import { DotButton, useDotButton } from "./CarouselDotButton";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Box, Flex } from "@chakra-ui/react";

type PropType = {
  options?: EmblaOptionsType;
  sliderContentComponent: React.ReactNode;
};

const Carousel: React.FC<PropType> = ({ options, sliderContentComponent }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  );

  return (
    <Box as="section" margin={"auto"} className="embla">
      <Box className="embla__viewport" overflow={"hidden"} ref={emblaRef}>
        <Flex className="embla__container">{sliderContentComponent}</Flex>
      </Box>
      <Flex
        className="embla__controls"
        padding={0}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Flex className="embla__dots" display={"inline-flex"} gap={"8px"}>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              width={index === selectedIndex ? "32px" : "8px"}
              minWidth={"8px"}
              height={"8px"}
              minHeight={"8px"}
              padding={0}
              bg={
                index === selectedIndex
                  ? "secondary.700.light"
                  : "secondary.200.light"
              }
              transition={"width 1s"}
              _hover={{
                bg: "secondary.700.light",
              }}
            />
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Carousel;
