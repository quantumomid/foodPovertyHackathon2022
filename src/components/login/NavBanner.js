import { Flex, Heading } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export default function NavBanner({ path, title }) {
    const router = useRouter();

    return (
        <Flex 
            alignItems="center" justifyContent="center"
            bg="white" py="2"
        >
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
    )
}