import { Flex, Heading, FormLabel, FormControl, Input, Button, Text } from "@chakra-ui/react";
import FormStepBanner from "./FormStepBanner";

export default function FormPage3({ familyOrIndividual, primaryDetails, handlePrimaryDetailsChange, setFormStep }) {
    return (
        <>
            <FormStepBanner targetStep={familyOrIndividual==="individual" ? 1: 2} setFormStep={setFormStep} />

            <Flex flexDir="column" h="90vh" px="6" pt="10">

                <Heading>
                    { familyOrIndividual==="individual" ? "Individual registration" : "Family registration"}
                </Heading>
                <Text fontSize="20px" fontWeight="500" pb="10">
                    { familyOrIndividual==="individual" ? "Do they have any additional needs?" : "Does this family have any additional needs?"}
                </Text>

                <FormControl pb="10">
                    <FormLabel htmlFor="medicalRequirements">Medical requirements</FormLabel>
                    <Input 
                        id="medicalRequirements" name="medicalRequirements" type="text" bg="white"
                        value={primaryDetails.medicalRequirements}
                        onChange={handlePrimaryDetailsChange}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="otherSpecialNeeds">Other special needs</FormLabel>
                    <Input 
                        id="otherSpecialNeeds" name="otherSpecialNeeds" type="text" bg="white"
                        value={primaryDetails.otherSpecialNeeds}
                        onChange={handlePrimaryDetailsChange}
                    />
                </FormControl>

                <Button 
                    colorScheme="teal"
                    mt="auto" py="24px"
                    onClick={() => setFormStep(4)}
                >
                        Continue
                </Button>
            </Flex>
        </>
    )
}