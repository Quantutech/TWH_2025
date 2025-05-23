import React, { useState } from "react"
import {
  Box,
  Flex,
  HStack,
  Text,
  Image,
  Grid,
  GridItem,
} from "@chakra-ui/react"
import { blogItems } from "@repo/ui/constants/constant"
import { colors } from "@repo/ui/theme"
import { FaAngleDown, FaAngleUp } from "react-icons/fa"

const MediaTab = () => {
  const [visibleItems, setVisibleItems] = useState(3)

  const handleViewMore = () => {
    if (visibleItems < blogItems.length) {
      setVisibleItems(blogItems.length)
    } else {
      setVisibleItems(3)
    }
  }
  return (
    <HStack
      id="media"
      borderRadius="16px"
      border="1px solid"
      borderColor={"secondary.100.light"}
      padding={{ base: "16px", lg: "24px" }}
      bg="base.white.light"
      alignItems={"flex-start"}
      flexDirection={"column"}
      mb={{ base: "16px", lg: "24px" }}
    >
      <Text color={"secondary.950.light"} fontWeight={600} fontSize={"20px"}>
        Media
      </Text>
      <Flex flexWrap={"wrap"}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            xl: "repeat(3, 1fr)",
          }}
          gap={"16px"}
        >
          {blogItems.slice(0, visibleItems).map((item) => (
            <GridItem
              key={item.id}
              borderRadius="16px"
              overflow="hidden"
              transition="all 0.2s"
              width={"100%"}
              padding="16px"
              gap="16px"
              cursor="pointer"
              border={"1px solid"}
              borderColor={"secondary.100.light"}
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <Image
                src={item.bannerImage}
                alt="banner"
                width="100%"
                height="176px"
                objectFit="cover"
              />
              <Box paddingY={"16px"}>
                <Text
                  color="primary.500.light"
                  fontSize="14px"
                  fontWeight={600}
                >
                  {item.category}
                </Text>
                <Flex justify="space-between" align="center">
                  <Text
                    display={"flex"}
                    fontSize={{
                      base: "18px",
                      md: "20px",
                      lg: "22px",
                      xl: "24px",
                    }}
                    fontWeight={600}
                    color="secondary.950.light"
                    minH={"72px"}
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                  >
                    {item.title}
                  </Text>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 11L11 1M11 1H1M11 1V11"
                      stroke={colors.secondary["950"].light}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Flex>
                <Text
                  color="grayScale.500.light"
                  fontSize={{ base: "14px", lg: "16px" }}
                >
                  {item.description}
                </Text>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Flex>
      {blogItems?.length > 3 && (
        <HStack
          w="100%"
          justifyContent="center"
          mt="8px"
          bg="transparent"
          onClick={handleViewMore}
          cursor="pointer"
        >
          <Text fontSize="14px" fontWeight={600} color="primary.500.light">
            {visibleItems < blogItems.length ? "View More" : "View Less"}
          </Text>
          {visibleItems < blogItems.length ? (
            <FaAngleDown color={colors.primary["500"].light} />
          ) : (
            <FaAngleUp color={colors.primary["500"].light} />
          )}
        </HStack>
      )}
    </HStack>
  )
}

export default MediaTab
