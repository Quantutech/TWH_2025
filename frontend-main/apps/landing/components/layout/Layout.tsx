import React from "react";
import Topbar from "./topbar/Topbar";
import Footer from "./Footer";
import { Box, DividerProps } from "@chakra-ui/react";

const Layout = ({
  children,
  childrenContainerProps,
  mainContainerProps,
}: {
  children: React.ReactNode;
  childrenContainerProps?: DividerProps;
  mainContainerProps?: DividerProps;
}) => {
  return (
    <>
      <Topbar />
      <Box
        as="main"
        width={"100%"}
        bg={"secondary.50.light"}
        padding={{ base: "0px 16px", sm: "0px 32px", md: "0px 64px" }}
        {...mainContainerProps}
      >
        <Box
          bg={"secondary.50.light"}
          maxWidth={"1440px"}
          margin={"0 auto"}
          {...childrenContainerProps}
        >
          {children}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
