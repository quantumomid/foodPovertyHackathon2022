import { Flex, Heading, Text, Button, VStack, Box } from "@chakra-ui/react";

export default function Feature({ title, desc, ...rest }) {
  return (
    <Box p={5} shadow="md" borderWidth="1px" bordeRadius={3} {...rest}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{desc}</Text>
    </Box>
  );
}
