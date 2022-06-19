import { Box, Divider, Text } from "@chakra-ui/react";

export default function UserInfoCard({ topText, bottomText }) {
  return (
    <Box >
    <Text fontSize='s' fontWeight={"medium"} color={"#6B7280"}> {topText}</Text>
    <Text colour={"#1E1E1E"} mb={3}>{bottomText}</Text>
    <Divider color="#52B788"/>
  </Box>
  );
}
