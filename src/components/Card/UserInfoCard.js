import { Box, Divider, Text } from "@chakra-ui/react";

export default function UserInfoCard({ topText, bottomText }) {
  return (
    <Box color={"#6B7280"}>
    <Text fontSize='s' > {topText}</Text>
    <Text colour={"grey.900"} mb={3}>{bottomText}</Text>
    <Divider color="#52B788"/>
  </Box>
  );
}
