import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Navigation({ text, icon, path, ...rest }) {
  const router = useRouter();
  console.log(path);
  return (
    <Box height="56px" shadow="md" borderWidth="1px" borderRadius="10px" {...rest} bgColor="rgba(49, 151, 149, 0.2)">
      <Flex pt="4" pl="3" justifyContent={"space-between"} textAlign="center">
        <Flex>
          <Box mt="4px" mr="4">
            {" "}
            {icon}
          </Box>
          <Text>{text}</Text>
        </Flex>
        <IconButton
          bgColor="transparent"
          _active={{
            bgColor: "transparent"
          }}
          _focus={{
            bgColor: "transparent"
          }}
          icon={<ChevronRightIcon w={6} h={6} onClick={() => router.push(path)} />}
          mt="-2"
        ></IconButton>
      </Flex>
    </Box>
  );
}
