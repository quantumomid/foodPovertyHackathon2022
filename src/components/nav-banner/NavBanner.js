import { Flex, Heading } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export default function NavBanner({ path, title, content }) {
    const router = useRouter();
    return (
        <Flex 
        direction={"column"}
            alignItems="center" justifyContent="center"
            bg="white" py="2" w="full"
        >
            <Flex alignItems="center" justifyContent="flex-start"  w="full">
            <ChevronLeftIcon 
                w="8" h="10" mr="30vw"
                onClick={() => {path ? router.push(path): router.back()}}
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