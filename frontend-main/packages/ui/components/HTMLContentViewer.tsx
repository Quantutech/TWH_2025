"use client";
import { Box, Flex, FlexProps, Spinner, SpinnerProps } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { getBlogContent } from "../utils/api";

interface Props {
  contextUrl: string;
  loadingContainerPorps?: FlexProps;
  loadingSpinnerProps?: SpinnerProps;
}

const HTMLContentViewer = ({
  contextUrl,
  loadingContainerPorps,
  loadingSpinnerProps,
}: Props) => {
  if (!contextUrl) {
    return <Box fontWeight={500}>-</Box>;
  }

  const edittedContextUrl = useMemo(() => {
    if (contextUrl) {
      return contextUrl?.split("\\").pop();
    }
    return "";
  }, [contextUrl]);

  const [htmlContent, setHtmlContent] = useState("");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["htmlContent", edittedContextUrl],
    queryFn: (options) => getBlogContent(options.queryKey[1] as string),
  });
  useEffect(() => {
    setHtmlContent(data);
  }, [data]);

  if (isLoading) {
    return (
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        fontWeight={500}
        {...loadingContainerPorps}
      >
        <Spinner color="secondary.500.light" {...loadingSpinnerProps} />
      </Flex>
    );
  }

  if (isError && !isLoading) {
    return <></>;
  }

  return <Box dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default HTMLContentViewer;
