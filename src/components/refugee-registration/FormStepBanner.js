import { Flex, Heading } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

export default function FormStepBanner({ targetStep, setFormStep }) {

    return (
        <Flex 
            alignItems="center" justifyContent="center"
            bg="white" py="2" w="full"
        >
            <ChevronLeftIcon 
                w="8" h="10" mr="auto"
                onClick={() => setFormStep(targetStep)}
            />
            <Heading
                mr="auto" 
                fontSize="16px"
                fontWeight="700"
            >
                Refugee registration
            </Heading>
        </Flex>
    )
}