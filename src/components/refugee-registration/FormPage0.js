import { Flex, Heading, FormLabel, FormControl, Select, Input, Button } from "@chakra-ui/react";

export default function FormPage1({ formInputs, handleFormInputChange, setFormStep }) {
    return (
        <Flex flexDir="column" h="90vh" px="6" pt="10">
            <Heading>Refugee registration</Heading>
            
            <FormControl py="10">
                <FormLabel htmlFor="familyOrIndividual">Are you registering a family or an individual?</FormLabel>
                <Select 
                    id="familyOrIndividual" name="familyOrIndividual"
                    placeholder="Select option" bg="white"
                    value={formInputs.familyOrIndividual}
                    onChange={handleFormInputChange}
                >
                    <option>Family</option>
                    <option>Individual</option>
                </Select>
            </FormControl>

            <FormControl pb="10">
                <FormLabel htmlFor="camp">Which camp are they staying in?</FormLabel>
                <Select 
                    id="camp" name="camp"
                    placeholder="Select option" bg="white"
                    value={formInputs.camp}
                    onChange={handleFormInputChange}

                >
                    <option>Lebanon Inner City Camp</option>
                    <option>Lebanon Outer City Camp</option>
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="tentId">Enter tent ID</FormLabel>
                <Input 
                    id="tentId" name="tentId" type="text" bg="white"
                    value={formInputs.tentId}
                    onChange={handleFormInputChange}
                />
            </FormControl>

            <Button 
                colorScheme="teal"
                mt="auto"
                onClick={() => setFormStep(1)}
            >
                    Continue
            </Button>
        </Flex>
    )
}