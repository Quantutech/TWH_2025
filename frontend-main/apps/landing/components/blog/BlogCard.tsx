import { Box, Flex, Image, Text } from "@chakra-ui/react";

interface BlogCardProps {
  image: string;
  category: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
}

const BlogCard = ({
  image,
  category,
  title,
  description,
  author,
  date,
}: BlogCardProps) => {
  return (
    <Box
      as="article"
      borderRadius="16px"
      overflow="hidden"
      border="1px solid"
      borderColor="secondary.100.light"
      transition="all 0.2s"
      cursor="pointer"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Image
        src={image}
        alt={title}
        width="100%"
        height="200px"
        objectFit="cover"
      />
      <Box p="24px">
        <Text
          color="primary.600.light"
          fontSize="14px"
          fontWeight={600}
          mb="8px"
        >
          {category}
        </Text>
        <Flex justify="space-between" align="center" mb="8px">
          <Text fontSize="20px" fontWeight={600} color="secondary.950.light">
            {title}
          </Text>
          ICON
        </Flex>
        <Text color="secondary.600.light" fontSize="16px" mb="16px">
          {description}
        </Text>
        <Flex align="center" gap="8px">
          <Image
            src={author.avatar}
            alt={author.name}
            width="24px"
            height="24px"
            borderRadius="full"
          />
          <Text fontSize="14px" fontWeight={500}>
            {author.name}
          </Text>
          <Text fontSize="14px" color="secondary.600.light">
            {date}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default BlogCard;
