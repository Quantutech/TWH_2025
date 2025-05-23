"use client";
import { Center, Flex, FlexProps, Spinner } from "@chakra-ui/react";
import { CSSProperties, useMemo, useState } from "react";
import ReactPlayer from "react-player";
import VideoPlayIcon from "../icons/VideoPlayIcon";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

interface Props {
  videoPreviewUrl?: string | undefined;
  videoUrl: string | undefined;
  containerProps?: FlexProps;
  videoProps?: ReactPlayer["props"];
}

const IntroVideo = ({
  videoUrl,
  containerProps,
  videoProps,
  videoPreviewUrl,
}: Props) => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [controls, setControls] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const videoStyle: CSSProperties = useMemo(() => {
    if (isError) {
      return { zIndex: -1, opacity: "0 !important", pointerEvents: "none" };
    } else if (isLoading) {
      return { zIndex: -1, opacity: "0 !important", pointerEvents: "none" };
    } else {
      return { zIndex: 1, opacity: 1, pointerEvents: "all" };
    }
  }, [isError, isLoading]);

  const layout = useMemo(() => {
    if (isError) {
      return (
        <Flex
          position="absolute"
          top={0}
          left={0}
          bottom={0}
          right={0}
          zIndex={10}
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          userSelect="none"
          color={"base.white.light"}
          bg={"rgba(0, 0, 0, 1)"}
          onClick={() => {
            setPlaying(true);
            setControls(true);
          }}
        >
          The video could not be played.
        </Flex>
      );
    } else if (isLoading) {
      return (
        <Flex
          position="absolute"
          top={0}
          left={0}
          bottom={0}
          right={0}
          zIndex={10}
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          userSelect="none"
          bg={"rgba(0, 0, 0, 1)"}
          onClick={() => {
            setPlaying(true);
            setControls(true);
          }}
        >
          <Spinner color="secondary.500.light" width={"48px"} height={"48px"} />
        </Flex>
      );
    } else if (!playing) {
      return (
        <Flex
          position="absolute"
          top={0}
          left={0}
          bottom={0}
          right={0}
          zIndex={10}
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          userSelect="none"
          bg={"rgba(0, 0, 0, 0.5)"}
          transitionDuration={"300ms"}
          _hover={{
            bg: "rgba(0, 0, 0, 0.3)",
          }}
          onClick={() => {
            setPlaying(true);
            setControls(true);
          }}
        >
          <VideoPlayIcon svg={{ width: "48px", height: "48px" }} />
        </Flex>
      );
    }
  }, [playing, isError, isLoading]);

  return (
    <Center
      position="relative"
      width="100%"
      borderRadius={"12px"}
      overflow={"hidden"}
      {...containerProps}
    >
      {layout}
      <ReactPlayer
        width="100%"
        height="auto"
        controls={controls}
        playing={playing}
        url={videoPreviewUrl ?? `${baseURL}/uploads/${videoUrl}`}
        style={videoStyle}
        onPause={() => {
          setPlaying(false);
          setControls(false);
        }}
        onPlay={() => {
          setPlaying(true);
        }}
        onReady={() => {
          setIsLoading(false);
        }}
        onSeek={() => {
          setPlaying(true);
          setControls(true);
        }}
        onError={() => {
          setIsError(true);
          setPlaying(false);
          setControls(false);
          setIsLoading(false);
        }}
        {...videoProps}
      />
    </Center>
  );
};

export default IntroVideo;
