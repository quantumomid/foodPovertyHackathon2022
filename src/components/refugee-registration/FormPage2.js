import { Flex, Heading, Button, Text } from "@chakra-ui/react";
import FormStepBanner from "./FormStepBanner";
import NumberInputComponent from "./NumberInputComponent";

export default function FormPage2({ numberOfAdults, setNumberOfAdults, numberOfChildren, setNumberOfChildren, numberOfInfants, setNumberOfInfants, numberOfElders, setNumberOfElders, primaryDetails, setFormStep }) {
    return (
        <>
            <FormStepBanner targetStep={1} setFormStep={setFormStep} />

            <Flex flexDir="column" h="90vh" px="6" pt="10">

                <Heading>
                    {"Family registration"}
                </Heading>
                <Text fontSize="20px" fontWeight="500">
                    {`Enter family details for ${primaryDetails.firstname}.`}
                </Text>
                
                <NumberInputComponent 
                    label="Number of adults"
                    identifier="numberOfAdults"
                    value={numberOfAdults}
                    valueSetter={setNumberOfAdults}
                    hint="Ages 18-59"
                />

                <NumberInputComponent 
                    label="Number of children"
                    identifier="numberOfChildren"
                    value={numberOfChildren}
                    valueSetter={setNumberOfChildren}
                    hint="Ages 4-17"
                />

                <NumberInputComponent 
                    label="Number of infants"
                    identifier="numberOfInfants"
                    value={numberOfInfants}
                    valueSetter={setNumberOfInfants}
                    hint="Ages 0-3"
                />

                <NumberInputComponent 
                    label="Number of elders"
                    identifier="numberOfElders"
                    value={numberOfElders}
                    valueSetter={setNumberOfElders}
                    hint="Ages 60+"
                />

                <Button 
                    colorScheme="teal"
                    mt="auto" py="24px"
                    onClick={() => setFormStep(3)}
                >
                        Continue
                </Button>
            </Flex>
        </>
    )
}