import { Flex, Heading } from "@chakra-ui/react"

export default function Banner({ heading }) {
    return (
        <Flex 
            alignItems="center" justifyContent="center"
            bg="white" py="5" w="full"
        >
            <Heading
                fontSize="16px"
                fontWeight="700"
            >
                {heading}
            </Heading>
        </Flex>
    )
}