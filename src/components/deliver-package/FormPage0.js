import { Flex, Heading, FormLabel, FormControl, Select, Input, Button } from "@chakra-ui/react";
import NavBanner from "../nav-banner/NavBanner";
import NumberInputComponent from "../refugee-registration/NumberInputComponent";

export default function FormPage0({ formInputs, handleFormInputChange, setFormStep, noOfPackages, setNoOfPackages, onConfirmDeliverPackage}) {
    return (
        <>
            <NavBanner path="" title="Deliver a package" />

            <Flex flexDir="column" h="90vh" px="6" pt="10">
                <Heading>Deliver a package</Heading>
                
                <FormControl py="10">
                    <FormLabel htmlFor="packageType">Select a package</FormLabel>
                    <Select 
                        id="packageType" name="packageType"
                        placeholder="Select option" bg="white"
                        value={formInputs.packageType}
                        onChange={handleFormInputChange}
                    >
                        <option>Basic Universal Pack</option>
                        <option>Custom</option>
                    </Select>
                </FormControl>

                <FormControl pb="10">
                    <NumberInputComponent
                        label="Number of packages"
                        identifier="noOfPackages"
                        value={noOfPackages}
                        valueSetter={setNoOfPackages}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="description">Enter details</FormLabel>
                    <Input 
                        id="description" name="description" type="text" bg="white"
                        value={formInputs.description}
                        onChange={handleFormInputChange}
                    />
                </FormControl>

                <Button 
                    colorScheme="teal"
                    mt="auto" py="24px"
                    onClick={() => onConfirmDeliverPackage()}
                >
                        Continue
                </Button>
            </Flex>
        </>
    )
}