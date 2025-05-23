"use client";
import {
  Box,
  Flex,
  Image,
  List,
  ListItem,
  Text,
  Link,
  Button,
} from "@chakra-ui/react";
import mainImage from "@repo/ui/assets/blog/blog-details/first-image.png";
import profileImage from "@repo/ui/assets/blog/blog-details/profile.png";
import profile2Image from "@repo/ui/assets/blog/blog-details/profile-2.png";
import copyImage from "@repo/ui/assets/blog/blog-details/links/copy.png";
import facebookImage from "@repo/ui/assets/blog/blog-details/links/facebook.png";
import linkedinImage from "@repo/ui/assets/blog/blog-details/links/linkedin.png";
import xImage from "@repo/ui/assets/blog/blog-details/links/x.png";
import content1Image from "@repo/ui/assets/blog/blog-details/content-1.png";
import content2Image from "@repo/ui/assets/blog/blog-details/content-2.png";
import { useState } from "react";
import Slider from "@repo/ui/components/custom-slider/Slider";
import { articles } from "@repo/ui/constants/constant";

const MainContent = () => {
  const [activeLink, setActiveLink] = useState<string>("table-of-contents");

  const linkInfo = [
    {
      id: "table-of-contents",
      title: "Table of contents",
      href: "#table-of-contents",
      onClick: () => setActiveLink("table-of-contents"),
    },
    {
      id: "introduction",
      title: "Introduction",
      href: "#introduction",
      onClick: () => setActiveLink("introduction"),
    },
    {
      id: "software-and-tools",
      title: "Software and tools",
      href: "#software-and-tools",
      onClick: () => setActiveLink("software-and-tools"),
    },
    {
      id: "other-resources",
      title: "Other resources",
      href: "#other-resources",
      onClick: () => setActiveLink("other-resources"),
    },
    {
      id: "conclusion",
      title: "Conclusion",
      href: "#conclusion",
      onClick: () => setActiveLink("conclusion"),
    },
  ];

  const socialLinks = [
    {
      id: "copy",
      src: copyImage.src,
      alt: "copy",
    },
    {
      id: "facebook",
      src: facebookImage.src,
      alt: "facebook",
    },
    {
      id: "linkedin",
      src: linkedinImage.src,
      alt: "linkedin",
    },
    {
      id: "x",
      src: xImage.src,
      alt: "x",
    },
  ];

  return (
    <Box width={"100%"}>
      <Box
        maxW={"1440px"}
        margin={"auto"}
        padding={{
          base: "32px 16px",
          sm: "32px 16px",
          md: "32px 16px",
          lg: "32px 16px",
          xl: "64px 16px",
          "2xl": "64px 0px",
        }}
      >
        <Flex
          width={"100%"}
          alignItems={"center"}
          gap={"16px"}
          flexDirection={{ base: "column", md: "row" }}
          paddingTop={"16px"}
        >
          <Flex gap={{ base: "24px", lg: "48px" }} direction={"column"}>
            <Flex alignItems={"center"} gap={"32px"} whiteSpace={"nowrap"}>
              <Flex
                border={"1px solid"}
                borderColor={"primary.200.light"}
                backgroundColor={"primary.50.light"}
                borderRadius={"999px"}
                p={"4px 10px 4px 4px"}
                color={"primary.700.light"}
                fontWeight={500}
                fontSize={"12px"}
                alignItems={"center"}
                gap={"8px"}
              >
                <Text
                  backgroundColor={"base.white.light"}
                  border={"1px solid"}
                  borderColor={"primary.200.light"}
                  padding={"2px 8px"}
                  borderRadius={"999px"}
                >
                  Mental Heath
                </Text>
                <Text>8 min read</Text>
              </Flex>
              <Text
                color={"primary.700.light"}
                fontSize={"12px"}
                fontWeight={600}
              >
                13 Jan 2024
              </Text>
            </Flex>
            <Text
              color={"secondary.950.light"}
              fontSize={{ base: "30px", md: "26px", lg: "28px", xl: "48px" }}
              fontWeight={600}
            >
              Migrating to Linear 101
            </Text>
            <Text
              color={"secondary.600.light"}
              fontSize={{ base: "18px", md: "20px" }}
              fontWeight={400}
            >
              Linear helps streamline software projects,sprints, tasks, and bug
              tracking. Here’s how to get started.
            </Text>
            <Flex gap={"16px"}>
              <Image
                src={profileImage.src}
                width={"56px"}
                height={"56px"}
                alt="blog"
              />
              <Flex flexDirection={"column"}>
                <Text
                  color={"secondary.950.light"}
                  fontSize={"18px"}
                  fontWeight={600}
                >
                  Natali Craig
                </Text>
                <Text
                  color={"secondary.600.light"}
                  fontSize={"16px"}
                  fontWeight={400}
                >
                  Published 14 Jan 2024
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Image
            src={mainImage.src}
            width={{ base: "100%", md: "400px", lg: "550px", xl: "644px" }}
            height={"auto"}
            alt="blog"
          />
        </Flex>
        <Flex mt={"48px"}>
          <List
            display={{ base: "none", lg: "block" }}
            marginRight={{ base: "0", md: "32px", lg: "48px", xl: "64px" }}
          >
            {linkInfo.map((link) => (
              <ListItem key={link.id}>
                <Link
                  color={
                    activeLink === link.id
                      ? "primary.600.light"
                      : "primary.500.light"
                  }
                  fontSize={"16px"}
                  fontWeight={600}
                  href={link.href}
                  onClick={link.onClick}
                >
                  {link.title}
                </Link>
              </ListItem>
            ))}
            <ListItem>
              <Box
                width={"100%"}
                height={"1px"}
                backgroundColor={"secondary.100.light"}
                my={"16px"}
              />
            </ListItem>
            <ListItem display={"flex"} gap={"16px"}>
              {socialLinks.map((link) => (
                <Flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  border={"1px solid"}
                  borderColor={"secondary.200.light"}
                  borderRadius={"8px"}
                  width={"40px"}
                  height={"40px"}
                  _hover={{
                    backgroundColor: "secondary.100.light",
                    cursor: "pointer",
                  }}
                  transitionDuration={"0.3s"}
                >
                  <Image
                    src={link.src}
                    width={"20px"}
                    height={"20px"}
                    alt={link.alt}
                  />
                </Flex>
              ))}
            </ListItem>
          </List>
          <Box>
            <Text
              id="table-of-contents"
              color={"secondary.600.light"}
              fontSize={"20px"}
              fontWeight={400}
              lineHeight={"30px"}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo
              massa. Eu dolor aliquet risus gravida nunc at feugiat consequat
              purus. Non massa enim vitae duis mattis. Vel in ultricies vel
              fringilla.
            </Text>
            <Box
              bg={"secondary.100.light"}
              width={"100%"}
              height={"1px"}
              my={"32px"}
            />
            <Text
              fontWeight={600}
              fontSize={"30px"}
              color={"secondary.950.light"}
            >
              Introduction
            </Text>
            <Text
              id="introduction"
              color={"secondary.600.light"}
              fontSize={"20px"}
              fontWeight={400}
              lineHeight={"27px"}
            >
              Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam
              suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum
              quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris
              posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At
              feugiat sapien varius id. <br /> Eget quis mi enim, leo lacinia
              pharetra, semper. Eget in volutpat mollis at volutpat lectus
              velit, sed auctor. Porttitor fames arcu quis fusce augue enim.
              Quis at habitant diam at. Suscipit tristique risus, at donec. In
              turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id
              est ac volutpat.
              <Image
                src={content1Image.src}
                width={"100%"}
                height={"auto"}
                alt="content"
                my={"32px"}
              />
            </Text>
            <Text
              id="introduction"
              color={"secondary.600.light"}
              fontSize={"20px"}
              fontWeight={400}
              lineHeight={"27px"}
            >
              Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim
              mauris id. Non pellentesque congue eget consectetur turpis.
              Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt
              aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue
              felis elit erat nam nibh orci.
            </Text>
            <Flex gap={"16px"} my={"32px"}>
              <Box
                height={"auto"}
                width={"4px"}
                backgroundColor={"primary.600.light"}
              />
              <Flex flexDirection={"column"} gap={"16px"}>
                <Text
                  fontWeight={500}
                  fontStyle={"italic"}
                  fontSize={"24px"}
                  color={"secondary.950.light"}
                >
                  “In a world older and more complete than ours they move
                  finished and complete, gifted with extensions of the senses we
                  have lost or never attained, living by voices we shall never
                  hear.”
                </Text>
                <Flex gap={"12px"}>
                  <Image
                    src={profile2Image.src}
                    width={"48px"}
                    height={"48px"}
                    alt="profile"
                  />
                  <Box>
                    <Text
                      fontWeight={600}
                      fontSize={"16px"}
                      color={"secondary.950.light"}
                    >
                      Olivia Rhye
                    </Text>
                    <Text
                      fontWeight={400}
                      fontSize={"16px"}
                      color={"text.secondary.600"}
                    >
                      Product Designer
                    </Text>
                  </Box>
                </Flex>
              </Flex>
            </Flex>
            <Text
              fontWeight={400}
              fontSize={"18px"}
              color={"secondary.600.light"}
              lineHeight={"27px"}
            >
              Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum,
              nulla odio nisl vitae. In aliquet pellentesque aenean hac
              vestibulum turpis mi bibendum diam. Tempor integer aliquam in
              vitae malesuada fringilla. <br />
              Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet
              commodo consectetur convallis risus. Sed condimentum enim
              dignissim adipiscing faucibus consequat, urna. Viverra purus et
              erat auctor aliquam. Risus, volutpat vulputate posuere purus sit
              congue convallis aliquet. Arcu id augue ut feugiat donec porttitor
              neque. Mauris, neque ultricies eu vestibulum, bibendum quam lorem
              id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.{" "}
              <br />
              Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim
              mauris id. Non pellentesque congue eget consectetur turpis.
              Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt
              aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue
              felis elit erat nam nibh orci.
            </Text>
            <Box id="software-and-tools" my={"32px"}>
              <Text
                fontWeight={600}
                fontSize={"30px"}
                color={"secondary.950.light"}
              >
                Software and tools
              </Text>
              <Text
                fontWeight={400}
                fontSize={"18px"}
                color={"secondary.600.light"}
                lineHeight={"27px"}
              >
                Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam
                suspendisse morbi eleifend faucibus eget vestibulum felis.
                Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam.
                Mauris posuere vulputate arcu amet, vitae nisi, tellus
                tincidunt. At feugiat sapien varius id. <br />
                Eget quis mi enim, leo lacinia pharetra, semper. Eget in
                volutpat mollis at volutpat lectus velit, sed auctor. Porttitor
                fames arcu quis fusce augue enim. Quis at habitant diam at.
                Suscipit tristique risus, at donec. In turpis vel et quam
                imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.
              </Text>
            </Box>
            <Box id="other-resources">
              <Text
                fontWeight={600}
                fontSize={"30px"}
                color={"secondary.950.light"}
              >
                Other resources
              </Text>
              <Box
                fontWeight={400}
                fontSize={"18px"}
                color={"secondary.600.light"}
                lineHeight={"27px"}
              >
                Sagittis et eu at elementum, quis in. Proin praesent volutpat
                egestas sociis sit lorem nunc nunc sit. Eget diam curabitur mi
                ac. Auctor rutrum lacus malesuada massa ornare et. Vulputate
                consectetur ac ultrices at diam dui eget fringilla tincidunt.
                Arcu sit dignissim massa erat cursus vulputate gravida id. Sed
                quis auctor vulputate hac elementum gravida cursus dis.
                <List ml={"8px"}>
                  <ListItem>
                    1. Lectus id duis vitae porttitor enim gravida morbi.
                  </ListItem>
                  <ListItem>
                    2. Eu turpis posuere semper feugiat volutpat elit, ultrices
                    suspendisse. Auctor vel in vitae placerat.
                  </ListItem>
                  <ListItem>
                    3. Suspendisse maecenas ac donec scelerisque diam sed est
                    duis purus.
                  </ListItem>
                </List>
              </Box>
            </Box>
            <Image
              src={content2Image.src}
              width={"100%"}
              height={"auto"}
              alt="content"
              my={"32px"}
            />
            <Text
              fontWeight={400}
              fontSize={"18px"}
              color={"secondary.600.light"}
              lineHeight={"27px"}
            >
              Lectus leo massa amet posuere. Malesuada mattis non convallis
              quisque. Libero sit et imperdiet bibendum quisque dictum
              vestibulum in non. Pretium ultricies tempor non est diam. Enim ut
              enim amet amet integer cursus. Sit ac commodo pretium sed etiam
              turpis suspendisse at.
              <br />
              Tristique odio senectus nam posuere ornare leo metus, ultricies.
              Blandit duis ultricies vulputate morbi feugiat cras placerat elit.
              Aliquam tellus lorem sed ac. Montes, sed mattis pellentesque
              suscipit accumsan. Cursus viverra aenean magna risus elementum
              faucibus molestie pellentesque. Arcu ultricies sed mauris
              vestibulum.
            </Text>
            <Box
              bg={"secondary.100.light"}
              w={"100%"}
              h={"1px"}
              my={{ base: "16px", md: "32px" }}
            />
            <Text
              display={"inline-block"}
              mr={"8px"}
              borderRadius={"999px"}
              border={"1px solid"}
              borderColor={"primary.200.light"}
              color={"primary.700.light"}
              fontSize={"14px"}
              fontWeight={500}
              p={"2px 10px"}
            >
              Design
            </Text>
            <Text
              display={"inline-block"}
              mr={"8px"}
              borderRadius={"999px"}
              border={"1px solid"}
              borderColor={"primary.200.light"}
              color={"primary.700.light"}
              fontSize={"14px"}
              fontWeight={500}
              p={"2px 10px"}
            >
              Research
            </Text>
            <Flex
              display={{ base: "flex", lg: "none" }}
              mt={"16px"}
              gap={"16px"}
            >
              {socialLinks.map((link) => (
                <Flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  border={"1px solid"}
                  borderColor={"secondary.200.light"}
                  borderRadius={"8px"}
                  width={"40px"}
                  height={"40px"}
                  _hover={{
                    backgroundColor: "secondary.100.light",
                    cursor: "pointer",
                  }}
                  transitionDuration={"0.3s"}
                >
                  <Image
                    src={link.src}
                    width={"20px"}
                    height={"20px"}
                    alt={link.alt}
                  />
                </Flex>
              ))}
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Box width={"100%"} bg={"base.white.light"}>
        <Box
          maxW={"1440px"}
          margin={"auto"}
          padding={{
            base: "32px 16px",
            sm: "32px 16px",
            md: "32px 16px",
            lg: "32px 16px",
            xl: "64px 16px",
            "2xl": "64px 0px",
          }}
        >
          <Slider
            navigationButtonTopSideComponent={
              <Button
                type="button"
                border={"1px solid"}
                borderColor={"primary.600.light"}
                backgroundColor={"transparent"}
                color={"primary.600.light"}
                fontWeight={600}
                padding={{ base: "0px 8px", md: "0px 16px" }}
                fontSize={{ base: "14px", md: "16px" }}
              >
                View all posts
              </Button>
            }
            sliderTitleComponent={
              <>
                <Text
                  fontSize={{ base: "24px", md: "30px" }}
                  fontWeight={700}
                  color="secondary.950.light"
                  mb={{ base: "4px", md: "12px" }}
                >
                  Latest writings
                </Text>
                <Text
                  fontSize={{ base: "18px", md: "20px" }}
                  fontWeight={400}
                  color="secondary.600.light"
                  mb={{ base: "8px", sm: "0px" }}
                >
                  The latest news, technologies, and resources from our team.
                </Text>
              </>
            }
          >
            {articles.map((item) => {
              return (
                <Flex
                  minW={{ base: "276px", md: "380px" }}
                  width={{ base: "276px", md: "380px" }}
                  maxW={{ base: "276px", md: "380px" }}
                  flexDirection={"column"}
                  cursor={"pointer"}
                  transitionDuration={"300ms"}
                  _hover={{ opacity: 0.7 }}
                >
                  <Image src={item.imageUrl} draggable={false} />
                  <Text
                    fontWeight={600}
                    fontSize={"14px"}
                    color={"primary.600.light"}
                    mt={"12px"}
                  >
                    Desing
                  </Text>
                  <Flex
                    alignItems={"flex-start"}
                    justifyContent={"space-between"}
                    fontWeight={600}
                    color={"secondary.950.light"}
                    fontSize={{ base: "20px", md: "24px" }}
                    my={{ base: "6px", md: "12px" }}
                  >
                    {item.title}
                    <Box width={"24px"} height={"24px"}>
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 11L11 1M11 1H1M11 1V11"
                          stroke="#182734"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </Box>
                  </Flex>
                  <Text
                    fontWeight={400}
                    fontSize={"16px"}
                    color={"secondary.600.light"}
                  >
                    {item.description}
                  </Text>
                  <Flex gap={"12px"} mt={"12px"}>
                    {/* <Image src={peopleMedical.src} width={"40px"} height={"40px"} /> */}
                    <Flex flexDirection={"column"} gap={"4px"}>
                      <Text
                        fontWeight={600}
                        fontSize={"14px"}
                        color={"text.secomdary.950.light"}
                      >
                        Natali Craig
                      </Text>
                      <Text
                        fontSize={"14px"}
                        color={"secondary.600.light"}
                        fontWeight={400}
                      >
                        {item.date}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              );
            })}
          </Slider>
        </Box>
      </Box>
    </Box>
  );
};

export default MainContent;
