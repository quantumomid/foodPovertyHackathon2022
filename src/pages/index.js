import { Flex, Heading, Text, Button, Divider } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import logo from '../images/image02.png';

export default function HomePage() {
  const { currentUser } = useSelector(state => state.user);
  const router = useRouter();
  return (
    <Flex flexDir="column" justifyContent="center" alignItems="center" py="20" px="8">
      <Head>
        <title>FP Hackathon | ⚡</title>
        <meta name="description" content="A tool to help food bank manage inventory and recipient details." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex flexDir="column" justifyContent="center" pb="5">
          <Image src={logo} alt="Logo" width={170} height={170} objectFit="contain" />
      </Flex>
        <Flex flexDir="column" justifyContent="center" pb="10">
            <Heading as='h1' size='4xl'>AccelerAid</Heading>
        </Flex>
      <Text fontSize="24px" fontWeight="500" textAlign="center" pb="24">
        Get started to begin delivering packages to refugees and help make a difference!
      </Text>
      <Button 
        onClick={() => router.push(currentUser ? "/dashboard" : "/login")}
        colorScheme="teal" px="36"
      >
        Get Started
      </Button>
    </Flex>
  );
}
