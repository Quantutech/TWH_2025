import {
  Box,
  Divider,
  HStack,
  Text,
  Tooltip,
  useToast,
  VStack,
} from "@chakra-ui/react";
import CalendarIcon from "@repo/ui/components/icons/CalendarIcon";
import FacebookIcon from "@repo/ui/components/icons/FacebookIcon";
import GlobalSearchIcon from "@repo/ui/components/icons/GlobalSearchIcon";
import HeartIcon from "@repo/ui/components/icons/HeartIcon";
import InstagramIcon from "@repo/ui/components/icons/InstagramIcon";
import LocationIcon from "@repo/ui/components/icons/LocationIcon";
import MedalStarIcon from "@repo/ui/components/icons/MedalStarIcon";
import ProfileStarIcon from "@repo/ui/components/icons/ProfileStarIcon";
import ShareIcon from "@repo/ui/components/icons/ShareIcon";
import ShieldCrossIcon from "@repo/ui/components/icons/ShieldCrossIcon";
import TickCircleIcon from "@repo/ui/components/icons/TickCircle";
import YoutubeIcon from "@repo/ui/components/icons/YoutubeIcon";
import ProfileImage from "@repo/ui/components/profile/ProfileImage";
import { colors } from "@repo/ui/theme";
import { getFormattedDateTime } from "@repo/ui/utils/helpers";
import { ProviderGetMeResponseData, ResponseData } from "@repo/ui/utils/type";
import { useState } from "react";

interface Props {
  data: ResponseData<ProviderGetMeResponseData> | undefined;
}

const ProfileTab = ({ data }: Props) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const insurances = data?.data?.insurances;
  const displayed = insurances
    ?.slice(0, 3)
    .map((item) => item.name)
    .join(", ");
  const fullList = insurances?.map((item) => item.name).join(", ");
  const hasMore = insurances?.length ? insurances.length > 3 : 0;
  const toast = useToast();

  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast({
        title: "Link copied to clipboard!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    });
  };

  const imageSize = {
    base: "96px",
    sm: "96px",
    md: "130px",
    lg: "170px",
    xl: "170px",
    "2xl": "200px",
  };

  return (
    <VStack
      borderRadius={"16px"}
      border={"1px"}
      width={"100%"}
      bg={"base.white.light"}
      borderColor={"secondary.100.light"}
      gap={{
        base: "8px",
        sm: "10px",
        md: "40px",
        lg: "50px",
        xl: "50px",
        "2xl": "60px",
      }}
      padding={{ base: "16px", lg: "24px" }}
      justifyContent={"flex-start"}
      alignItems={"flex-start"}
      position={"relative"}
    >
      <Box
        position={"absolute"}
        top={{
          base: "-50px",
          sm: "-50px",
          md: "-60px",
          lg: "-80px",
          xl: "-80px",
          "2xl": "-100px",
        }}
        left={{ base: "16px", lg: "24px" }}
      >
        <ProfileImage
          profileImageUrl={data?.data?.profileImageUrl}
          firstName={data?.data?.firstName}
          lastName={data?.data?.lastName}
          imageProps={{
            maxW: imageSize,
            minW: imageSize,
            width: imageSize,
            minH: imageSize,
            maxH: imageSize,
            height: imageSize,
            border: "4px solid",
            borderColor: "base.white.light",
            fontSize: "32px",
          }}
        />
      </Box>
      <HStack
        w={"100%"}
        alignItems={"flex-start"}
        justifyContent={"flex-end"}
        gap={{ base: "4px", sm: "8px", md: "12px" }}
      >
        <Box
          onClick={() => window.open(data?.data?.facebookUrl, "_blank")}
          cursor={"pointer"}
          opacity={1}
          transitionDuration={"300ms"}
          _hover={{ opacity: 0.6 }}
        >
          <FacebookIcon
            svg={{ width: "24px", height: "24px" }}
            path={{ fill: colors.base.black.light }}
          />
        </Box>
        <Box
          onClick={() => window.open(data?.data?.instagramUrl, "_blank")}
          cursor={"pointer"}
          opacity={1}
          transitionDuration={"300ms"}
          _hover={{ opacity: 0.6 }}
        >
          <InstagramIcon
            svg={{ width: "24px", height: "24px" }}
            path={{ fill: colors.base.black.light }}
          />
        </Box>
        <Box
          onClick={() => window.open(data?.data?.youtubeUrl, "_blank")}
          cursor={"pointer"}
          opacity={1}
          transitionDuration={"300ms"}
          _hover={{ opacity: 0.6 }}
        >
          <YoutubeIcon
            svg={{ width: "24px", height: "24px" }}
            path={{ fill: colors.base.black.light }}
          />
        </Box>
        <Box height="30px" display="flex" alignItems="center">
          <Divider border={"1px"} orientation="vertical" />
        </Box>
        {isFavorite ? (
          <HeartIcon
            svg={{ width: "24px", height: "24px" }}
            path={{ fill: colors.base.black.light }}
          />
        ) : (
          <HeartIcon
            svg={{ width: "24px", height: "24px" }}
            path={{ fill: colors.base.black.light }}
          />
        )}
        <Box onClick={handleShare} cursor={"pointer"}>
          <ShareIcon
            svg={{ width: "24px", height: "24px" }}
            path={{ fill: colors.base.black.light }}
          />
        </Box>
      </HStack>
      <VStack width={"100%"} gap={"24px"} alignItems={"flex-start"}>
        <VStack alignItems={"flex-start"}>
          <HStack>
            <Text
              fontWeight={"600"}
              fontSize={{ base: "24px", md: "26px", lg: "30px" }}
              color={"secondary.950.light"}
            >
              {data?.data?.firstName} {data?.data?.lastName}
            </Text>
            <Text
              fontWeight={"400"}
              fontSize={{ base: "16px", md: "18px", lg: "20px" }}
              color={"secondary.600.light"}
            >
              ({data?.data.gender})
            </Text>
          </HStack>
          <Text
            fontWeight={"400"}
            fontSize={{ base: "16px", lg: "18px" }}
            color={"secondary.500.light"}
          >
            {data?.data?.professionalTitle}
          </Text>
          <HStack>
            <Text
              fontWeight={"500"}
              fontSize={"16px"}
              color={"secondary.500.light"}
            >
              NPI (National Provider Identifier):
            </Text>
            <Text
              fontWeight={"600"}
              fontSize={"16px"}
              color={"secondary.950.light"}
            >
              {data?.data?.licenseNumber}
            </Text>
          </HStack>
        </VStack>
        <HStack
          w={"100%"}
          justifyContent={"space-around"}
          p={"16px 24px 16px 24px"}
          borderRadius={"12px"}
          bg="secondary.50.light"
          flexWrap={"wrap"}
          gap={{ base: "12px", md: "8px" }}
        >
          <VStack
            gap={"8px"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
          >
            <HStack>
              <MedalStarIcon svg={{ width: "24px", height: "24px" }} />
              <Text
                fontWeight="600"
                fontSize={{ base: "14px", md: "16px", lg: "18px" }}
              >
                +{data?.data?.yearsExperience}
              </Text>
            </HStack>
            <Text
              ml={"32px"}
              fontSize={{ base: "12px", md: "14px", lg: "16px" }}
              fontWeight={400}
              color={"secondary.500.light"}
            >
              Experience
            </Text>
          </VStack>
          <VStack
            gap={"8px"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
          >
            <HStack>
              <TickCircleIcon svg={{ width: "24px", height: "24px" }} />
              <Text
                fontWeight={600}
                fontSize={{ base: "14px", md: "16px", lg: "18px" }}
                color={"secondary.500.light"}
              >
                +{(data?.data as any)?.approvedappointmentscount}
              </Text>
            </HStack>
            <Text
              ml={"32px"}
              fontWeight={400}
              fontSize={{ base: "12px", md: "14px", lg: "16px" }}
              color={"secondary.500.light"}
            >
              Successful Appointment
            </Text>
          </VStack>
          {/* <VStack
            gap={"8px"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
          >
            <HStack>
              <ProfileStarIcon svg={{ width: "24px", height: "24px" }} />
              <Text
                fontWeight="600"
                fontSize={{ base: "14px", md: "16px", lg: "18px" }}
                color="secondary.950.light"
              >
                {(data?.data as any)?.rate || 0}
              </Text>
              <Text
                fontSize={{ base: "14px", lg: "16px" }}
                color={"secondary.500.light"}
              >
                (0 Reviews)
              </Text>
            </HStack>
            <Text
              ml={"32px"}
              fontWeight={400}
              fontSize={{ base: "12px", md: "14px", lg: "16px" }}
              color="secondary.500.light"
            >
              Rate
            </Text>
          </VStack> */}
        </HStack>
        <VStack gap={"16px"} alignItems={"flex-start"}>
          <HStack>
            <LocationIcon svg={{ width: "24px", height: "24px" }} />
            <Text
              fontWeight="400"
              fontSize="16px"
              color={"secondary.800.light"}
            >
              {data?.data?.address?.city},{data?.data?.address?.country}
            </Text>
          </HStack>
          <HStack>
            <ShieldCrossIcon svg={{ width: "24px", height: "24px" }} />
            <Tooltip
              label={fullList}
              isDisabled={!hasMore}
              hasArrow
              placement="top"
            >
              <Text
                fontWeight="400"
                fontSize="16px"
                color={"secondary.800.light"}
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {hasMore ? `${displayed}...` : displayed}
              </Text>
            </Tooltip>
          </HStack>
          <HStack>
            <GlobalSearchIcon svg={{ width: "24px", height: "24px" }} />
            <Text
              fontWeight="400"
              fontSize="16px"
              color={"primary.500.light"}
              textDecor={"underline"}
            >
              {data?.data?.email}
            </Text>
          </HStack>
          <HStack>
            <CalendarIcon svg={{ width: "24px", height: "24px" }} />
            <Text
              fontWeight="400"
              fontSize="16px"
              color={"secondary.500.light"}
            >
              Next Avaliable:
            </Text>
            <Text
              fontWeight={400}
              fontSize={"16px"}
              color={"secondary.800.light"}
            >
              {(data?.data?.availableSlot &&
                getFormattedDateTime((data?.data as any)?.availableSlot)) ||
                "-"}
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default ProfileTab;
