"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import SearchInput from "@repo/ui/components/SearchInput";
import searchIcon from "@repo/ui/assets/telewellnesshub/search.webp";
import banner1 from "@repo/ui/assets/blog/items/1.png";
import banner2 from "@repo/ui/assets/blog/items/2.png";
import banner3 from "@repo/ui/assets/blog/items/3.png";
import banner4 from "@repo/ui/assets/blog/items/4.png";
import banner5 from "@repo/ui/assets/blog/items/5.png";
import banner6 from "@repo/ui/assets/blog/items/6.png";
import banner7 from "@repo/ui/assets/blog/items/7.png";
import banner8 from "@repo/ui/assets/blog/items/8.png";
import banner9 from "@repo/ui/assets/blog/items/9.png";
import people2 from "@repo/ui/assets/blog/people/2.png";
import people3 from "@repo/ui/assets/blog/people/3.png";
import people4 from "@repo/ui/assets/blog/people/4.png";
import people5 from "@repo/ui/assets/blog/people/5.png";
import people6 from "@repo/ui/assets/blog/people/6.png";
import people7 from "@repo/ui/assets/blog/people/7.png";
import people8 from "@repo/ui/assets/blog/people/8.png";
import people9 from "@repo/ui/assets/blog/people/9.png";
import people10 from "@repo/ui/assets/blog/people/10.png";
import Pagination from "@repo/ui/components/Pagination";
import { colors } from "@repo/ui/theme";

interface Props {
  activeBlog: string;
  setActiveBlog: Dispatch<SetStateAction<string>>;
}

const BlogList = ({ activeBlog, setActiveBlog }: Props) => {
  const blogItems = [
    {
      id: 1,
      category: "Design",
      title: "UX review presentations",
      description:
        "How do you create compelling presentations your colleagues and impress your managers?",
      bannerImage: banner1.src,
      peopleImage: people2.src,
      fullName: "Olivia Rhye",
      date: "20 Jan 2024",
    },
    {
      id: 2,
      category: "Product",
      title: "Migrating to Linear 101",
      description:
        "Linear helps streamline software projects, sprints, tasks, and bug tracking.",
      bannerImage: banner2.src,
      peopleImage: people3.src,
      fullName: "Phoenix Baker",
      date: "19 Jan 2024",
    },
    {
      id: 3,
      category: "Software Engineering",
      title: "Building your API stack",
      description:
        "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
      bannerImage: banner3.src,
      peopleImage: people4.src,
      fullName: "Lana Steiner",
      date: "18 Jan 2024",
    },
    {
      id: 4,
      category: "Leadership",
      title: "Walsh leadership lessons",
      description:
        "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
      bannerImage: banner4.src,
      peopleImage: people5.src,
      fullName: "Alec Whitten",
      date: "17 Jan 2024",
    },
    {
      id: 5,
      category: "Product",
      title: "PM mental models",
      description:
        "Mental models are simple expressions of complex processes or relationships.",
      bannerImage: banner5.src,
      peopleImage: people6.src,
      fullName: "Demi WIlkinson",
      date: "16 Jan 2024",
    },
    {
      id: 6,
      category: "Design",
      title: "What is wireframing?",
      description:
        "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
      bannerImage: banner6.src,
      peopleImage: people7.src,
      fullName: "Candice Wu",
      date: "15 Jan 2024",
    },
    {
      id: 7,
      category: "Design",
      title: "How collaboration makes us better designers",
      description:
        "Collaboration can make our teams stronger, and our individual designs better.",
      bannerImage: banner7.src,
      peopleImage: people8.src,
      fullName: "Natali Craig",
      date: "14 Jan 2024",
    },
    {
      id: 8,
      category: "Product",
      title: "Our top 10 Javascript frameworks to use",
      description:
        "JavaScript frameworks make development easy with extensive features and functionalities.",
      bannerImage: banner8.src,
      peopleImage: people9.src,
      fullName: "Drew Cano",
      date: "13 Jan 2024",
    },
    {
      id: 9,
      category: "Podcast: Creating a better CX Community",
      title: "Podcast: Creating a better CX Community",
      description:
        "Starting a community doesn't need to be complicated, but how do you get started?",
      bannerImage: banner9.src,
      peopleImage: people10.src,
      fullName: "Orlando Diggs",
      date: "12 Jan 2024",
    },
  ];

  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(200 / itemsPerPage);

  const currentItems = blogItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Flex
        justifyContent={{ base: "flex-start", lg: "space-between" }}
        alignItems={{ base: "flex-start", lg: "center" }}
        gap={{ base: "8px", lg: "0px" }}
        borderBottom={"1px solid"}
        borderColor={"secondary.100.light"}
        p={"40px 0px 16px 0px"}
        flexDirection={{ base: "column", lg: "row" }}
      >
        <Flex
          gap={"8px"}
          whiteSpace={"nowrap"}
          color={"primary.600.light"}
          fontSize={{ base: "14px", lg: "16px" }}
          fontWeight={600}
          userSelect={"none"}
          w={{ base: "100%", md: "640px", lg: "auto" }}
          overflowX={"scroll"}
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Text
            p={"8px 12px"}
            _hover={{ bg: "primary.100.light" }}
            bg={activeBlog === "view_all" ? "primary.100.light" : "transparent"}
            cursor={"pointer"}
            borderRadius={"8px"}
            onClick={() => setActiveBlog("view_all")}
          >
            View all
          </Text>
          <Text
            p={"8px 12px"}
            _hover={{ bg: "primary.100.light" }}
            bg={activeBlog === "design" ? "primary.100.light" : "transparent"}
            borderRadius={"8px"}
            cursor={"pointer"}
            onClick={() => setActiveBlog("design")}
          >
            Design
          </Text>
          <Text
            p={"8px 12px"}
            _hover={{ bg: "primary.100.light" }}
            bg={activeBlog === "product" ? "primary.100.light" : "transparent"}
            cursor={"pointer"}
            borderRadius={"8px"}
            onClick={() => setActiveBlog("product")}
          >
            Product
          </Text>
          <Text
            p={"8px 12px"}
            _hover={{ bg: "primary.100.light" }}
            bg={
              activeBlog === "software_development"
                ? "primary.100.light"
                : "transparent"
            }
            cursor={"pointer"}
            borderRadius={"8px"}
            onClick={() => setActiveBlog("software_development")}
          >
            Software Development
          </Text>
          <Text
            p={"8px 12px"}
            _hover={{ bg: "primary.100.light" }}
            bg={
              activeBlog === "customer_success"
                ? "primary.100.light"
                : "transparent"
            }
            cursor={"pointer"}
            borderRadius={"8px"}
            onClick={() => setActiveBlog("customer_success")}
          >
            Customer Success
          </Text>
        </Flex>
        <Box width={{ base: "100%", md: "584px", lg: "320px" }}>
          <SearchInput
            icon={searchIcon.src}
            placeholder={"Search"}
            width={"100%"}
          />
        </Box>
      </Flex>
      <Flex
        wrap="wrap"
        justifyContent={{ base: "center", xl: "space-between" }}
        gap="24px"
        mt="32px"
      >
        {currentItems.map((item) => {
          return (
            <Box
              key={item.id}
              borderRadius="16px"
              overflow="hidden"
              transition="all 0.2s"
              width={"100%"}
              maxW={{
                base: "100%",
                md: "356px",
                lg: "300px",
                xl: "350px",
                "2xl": "384px",
              }}
              cursor="pointer"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <Image
                src={item.bannerImage}
                alt={"banner"}
                width="100%"
                height={"auto"}
                objectFit="cover"
              />
              <Box p="24px">
                <Text
                  color="primary.600.light"
                  fontSize="14px"
                  fontWeight={600}
                  mb="8px"
                >
                  {item.category}
                </Text>
                <Flex justify="space-between" align="center" mb="8px">
                  <Text
                    fontSize={{ base: "18px", lg: "24px" }}
                    fontWeight={600}
                    color="secondary.950.light"
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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </Flex>
                <Text
                  color="secondary.600.light"
                  fontSize={{ base: "14px", lg: "16px" }}
                  mb="16px"
                >
                  {item.description}
                </Text>
                <Flex align="center" gap="8px">
                  <Image
                    src={item.peopleImage}
                    alt={"people"}
                    width="40px"
                    height="40px"
                    borderRadius="full"
                  />
                  <Flex flexDirection={"column"}>
                    <Text fontSize="14px" fontWeight={500}>
                      {item.fullName}
                    </Text>
                    <Text fontSize="14px" color="secondary.600.light">
                      {item.date}
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </Box>
          );
        })}
      </Flex>
      <Box w={"100%"} h={"1px"} bg={"secondary.100.light"} my={"16px"}></Box>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default BlogList;
