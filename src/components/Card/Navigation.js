import { ChevronRightIcon, Icon } from "@chakra-ui/icons";
import { Box, Text, Flex, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Navigation({ text, icon, path, ...rest }) {
  const router = useRouter();
  return (
    <Box height="56px" shadow="md" borderWidth="1px" borderRadius="10px" {...rest} bgColor="rgba(49, 151, 149, 0.2)">
      <Flex pt="4" pl="1" justifyContent={"space-between"} textAlign="center">
        <Flex>
          <Icon as={icon} mr="10px" w={4} h={6} />
          <Text>{text}</Text>
        </Flex>
        <IconButton
          bgColor="transparent"
          icon={<ChevronRightIcon w={6} h={6} onClick={() => router.push({ path })} />}
          mt="-2"
        ></IconButton>
      </Flex>
    </Box>
  );
}
