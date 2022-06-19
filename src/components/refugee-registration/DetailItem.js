import { Text, Flex } from "@chakra-ui/react";

export default function DetailItem({ title, value }) {
    return (
        <>
            <Text as="dt" color="gray.500" fontSize="14px" fontWeight="500">{title}</Text>
            <Text as="dd" color="gray.900" fontSize="14px" fontWeight="400">{value}</Text>
        </>
    )
}