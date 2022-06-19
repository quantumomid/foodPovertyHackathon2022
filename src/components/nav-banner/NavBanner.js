import { Flex, Heading } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export default function NavBanner({ path, title, content }) {
    const router = useRouter();
    return (
        <Flex 
            bg="white"  direction={"column"}
            alignItems="center" justifyContent="center"
            w="full"
        >
            <Flex alignItems="center" justifyContent="center">
            <ChevronLeftIcon 
                w="8" h="10" mr="auto"
                onClick={() => router.push(path)}
            />
            <Heading
                mr="auto" 
                fontSize="16px"
                fontWeight="700"
            >
                {title}
            </Heading>
            </Flex>
            {content}
        </Flex>
    )
}