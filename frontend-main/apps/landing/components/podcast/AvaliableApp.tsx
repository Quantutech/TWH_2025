"use client";
import { VStack, Text, HStack, Image, Flex } from "@chakra-ui/react";
import React, { MouseEventHandler } from "react";
import applePodcast from "@repo/ui/assets/platforms/apple-podcast.webp";
import amazonPodcast from "@repo/ui/assets/platforms/amazon-podcast.webp";
import iheartPodcast from "@repo/ui/assets/platforms/iheart-podcast.webp";
import castBox from "@repo/ui/assets/platforms/castbox.webp";
import soundCloud from "@repo/ui/assets/platforms/soundcloud.webp";
import spotify from "@repo/ui/assets/platforms/spotify.webp";
import youtubeMusic from "@repo/ui/assets/platforms/youtube-music.webp";

const AvaliableApp = () => {
  const handleImageClick:
    | MouseEventHandler<HTMLImageElement>
    | undefined = () => {
    window.open("https://www.buzzsprout.com/2134720", "_blank");
  };

  return (
    <Flex
      maxW={"1440px"}
      margin={"auto"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDir={"column"}
      gap={{ base: "8px", md: "16px", lg: "32px" }}
      padding={{
        base: "32px 16px",
        sm: "32px 16px",
        md: "32px 16px",
        lg: "32px 16px",
        xl: "64px 16px",
        "2xl": "64px 0px",
      }}
    >
      <VStack gap={"16px"} cursor={"default"}>
        <Text
          fontWeight={"600"}
          fontSize={{ base: "24px", lg: "30px" }}
          color={"secondary.950.light"}
        >
          Available on 18 Platforms
        </Text>
        <Text
          fontWeight={"400"}
          fontSize={{ base: "16px", lg: "20px" }}
          color={"secondary.600.light"}
          mb={"16px"}
        >
          Listen anytime, anywhere on
        </Text>
      </VStack>
      <HStack
        gap={{ base: "20px", lg: "40px" }}
        flexWrap={"wrap"}
        justifyContent={"center"}
      >
        <Image
          src={iheartPodcast.src}
          alt="apple"
          width={{ base: "46px", md: "60px", lg: "86px" }}
          height={{ base: "46px", md: "60px", lg: "86px" }}
          minW={{ base: "46px", md: "60px", lg: "86px" }}
          minH={{ base: "46px", md: "60px", lg: "86px" }}
          cursor={"pointer"}
          transitionDuration={"300ms"}
          _hover={{ opacity: "0.7" }}
          draggable={false}
          onClick={handleImageClick}
        />
        <Image
          src={amazonPodcast.src}
          alt="apple"
          width={{ base: "46px", md: "60px", lg: "86px" }}
          height={{ base: "46px", md: "60px", lg: "86px" }}
          minW={{ base: "46px", md: "60px", lg: "86px" }}
          minH={{ base: "46px", md: "60px", lg: "86px" }}
          cursor={"pointer"}
          transitionDuration={"300ms"}
          _hover={{ opacity: "0.7" }}
          draggable={false}
          onClick={handleImageClick}
        />
        <Image
          src={castBox.src}
          alt="apple"
          width={{ base: "46px", md: "60px", lg: "86px" }}
          height={{ base: "46px", md: "60px", lg: "86px" }}
          minW={{ base: "46px", md: "60px", lg: "86px" }}
          minH={{ base: "46px", md: "60px", lg: "86px" }}
          cursor={"pointer"}
          transitionDuration={"300ms"}
          _hover={{ opacity: "0.7" }}
          draggable={false}
          onClick={handleImageClick}
        />
        <Image
          src={spotify.src}
          alt="apple"
          width={{ base: "46px", md: "60px", lg: "86px" }}
          height={{ base: "46px", md: "60px", lg: "86px" }}
          minW={{ base: "46px", md: "60px", lg: "86px" }}
          minH={{ base: "46px", md: "60px", lg: "86px" }}
          cursor={"pointer"}
          transitionDuration={"300ms"}
          _hover={{ opacity: "0.7" }}
          draggable={false}
          onClick={handleImageClick}
        />
        <Image
          src={youtubeMusic.src}
          alt="apple"
          width={{ base: "46px", md: "60px", lg: "86px" }}
          height={{ base: "46px", md: "60px", lg: "86px" }}
          minW={{ base: "46px", md: "60px", lg: "86px" }}
          minH={{ base: "46px", md: "60px", lg: "86px" }}
          cursor={"pointer"}
          transitionDuration={"300ms"}
          _hover={{ opacity: "0.7" }}
          draggable={false}
          onClick={handleImageClick}
        />
        <Image
          src={applePodcast.src}
          alt="apple"
          width={{ base: "46px", md: "60px", lg: "86px" }}
          height={{ base: "46px", md: "60px", lg: "86px" }}
          minW={{ base: "46px", md: "60px", lg: "86px" }}
          minH={{ base: "46px", md: "60px", lg: "86px" }}
          cursor={"pointer"}
          transitionDuration={"300ms"}
          _hover={{ opacity: "0.7" }}
          draggable={false}
          onClick={handleImageClick}
        />
        <Image
          src={soundCloud.src}
          alt="apple"
          width={{ base: "46px", md: "60px", lg: "86px" }}
          height={{ base: "46px", md: "60px", lg: "86px" }}
          minW={{ base: "46px", md: "60px", lg: "86px" }}
          minH={{ base: "46px", md: "60px", lg: "86px" }}
          cursor={"pointer"}
          transitionDuration={"300ms"}
          _hover={{ opacity: "0.7" }}
          draggable={false}
          onClick={handleImageClick}
        />
      </HStack>
    </Flex>
  );
};

export default AvaliableApp;
