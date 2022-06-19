import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function HomePage() {
  const { currentUser } = useSelector(state => state.user);
  const router = useRouter();
  return (
    <Flex flexDir="column" justifyContent="center" alignItems="center" py="20" px="8">
      <Flex flexDir="column" justifyContent="center" pb="5">
          <Image src="/images/logo.png" alt="Logo" width={170} height={170} objectFit="contain" />
      </Flex>
        <Flex flexDir="column" justifyContent="center" pb="10">
            <Heading as='h1' size='4xl'>AccelerAid</Heading>
        </Flex>
      <Text fontSize="24px" fontWeight="500" textAlign="center" pb="24">
        Get started to begin delivering packages to refugees and help make a difference!
      </Text>
      <Button 
        onClick={() => router.push(currentUser ? "/dashboard" : "/login")}
        colorScheme="teal" px="36" py="6"
      >
        Get Started
      </Button>
    </Flex>
  );
}
