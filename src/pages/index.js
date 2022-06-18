import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();
  return (
    <Flex 
      flexDir="column" justifyContent="center" alignItems="center"
      py="20" px="8"
      >
      <Head>
        <title>FP Hackathon | ⚡</title>
        <meta name="description" content="A tool to help food bank manage inventory and reciepient details." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        flexDir="column"
        justifyContent="center"
        pb="32"
      >
        <Heading pb="8">
          Company name here
        </Heading>
        <Image 
          src="/images/logo.png"
          alt="Logo of a green circle"
          width={200}
          height={200}
          objectFit="contain"
        />
      </Flex>
      <Text fontSize="24px" fontWeight="500" textAlign="center" pb="24">
        Get started to begin delivering packages to refugess and help make a difference!
      </Text>
      <Button 
        onClick={() => router.push("/login")}
        colorScheme="teal" px="36"
      >
        Get Started
      </Button>
    </Flex>
  )
}
