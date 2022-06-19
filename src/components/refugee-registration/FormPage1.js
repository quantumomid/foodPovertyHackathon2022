import { Flex, Heading, FormLabel, FormControl, Input, Button, Text } from "@chakra-ui/react";
import DOBInput from "./DOBInput";
import FormStepBanner from "./FormStepBanner";

export default function FormPage1({ familyOrIndividual, primaryDetails, handlePrimaryDetailsChange, setFormStep }) {
    return (
        <>
            <FormStepBanner targetStep={0} setFormStep={setFormStep} />

            <Flex flexDir="column" h="90vh" px="6" pt="10">

                <Heading>
                    { familyOrIndividual==="individual" ? "Individual registration" : "Family registration"}
                </Heading>
                <Text fontSize="20px" fontWeight="500">
                    { familyOrIndividual==="individual" ? "Enter their details below" : "Enter the details for the head of the family."}
                </Text>
                
                <FormControl py="10">
                    <FormLabel htmlFor="firstName">First name</FormLabel>
                    <Input 
                        id="firstname" name="firstname" type="text" bg="white"
                        value={primaryDetails.firstname}
                        onChange={handlePrimaryDetailsChange}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="surname">Surname</FormLabel>
                    <Input 
                        id="surname" name="surname" type="text" bg="white"
                        value={primaryDetails.surname}
                        onChange={handlePrimaryDetailsChange}
                    />
                </FormControl>
                
                <DOBInput primaryDetails={primaryDetails} handlePrimaryDetailsChange={handlePrimaryDetailsChange} />

                <FormControl>
                    <FormLabel htmlFor="unID">United Nations Identity Number</FormLabel>
                    <Input 
                        id="unID" name="unID" type="text" bg="white"
                        value={primaryDetails.unID}
                        onChange={handlePrimaryDetailsChange}
                    />
                </FormControl>

                <FormControl py="10h">
                    <FormLabel htmlFor="contactNumber">Contact number</FormLabel>
                    <Input 
                        id="contactNumber" name="contactNumber" type="tel" bg="white"
                        value={primaryDetails.contactNumber}
                        onChange={handlePrimaryDetailsChange}
                    />
                </FormControl>

                <Button 
                    colorScheme="teal"
                    mt="auto"
                    onClick={() => setFormStep(familyOrIndividual==="individual" ? 3: 2)} // Individuals go straight to step 3
                >
                        Continue
                </Button>
            </Flex>
        </>
    )
}