import { Flex, Heading } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export default function NavBanner({ path, title, content }) {
    const router = useRouter();
    return (
        <Flex 
            width={"100vw"}
            bg="white" py="2" direction={"column"}
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