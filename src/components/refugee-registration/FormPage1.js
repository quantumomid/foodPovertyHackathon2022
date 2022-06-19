import { Flex, Heading, FormLabel, FormControl, Select, Input, Button } from "@chakra-ui/react";
import DOBInput from "./DOBInput";
import FormStepBanner from "./FormStepBanner";

export default function FormPage1({ primaryDetails, handlePrimaryDetailsChange, setFormStep }) {
    return (
        <>
            <FormStepBanner currentStep={1} setFormStep={setFormStep} />

            <Flex flexDir="column" h="90vh" px="6" pt="10">

                <Heading>Individual registration</Heading>
                
                <FormControl>
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

                <FormControl>
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
                    onClick={() => setFormStep(2)}
                >
                        Continue
                </Button>
            </Flex>
        </>
    )
}