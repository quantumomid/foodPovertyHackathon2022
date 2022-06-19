import { Flex, Heading, Text, Button, Divider } from "@chakra-ui/react";
import Notifications from "../notifications/Notifications";
import DetailItem from "./DetailItem";
import FormStepBanner from "./FormStepBanner";

export default function RegistrationSummary({ familyOrIndividual, setFormStep, primaryDetails, numberOfAdults, numberOfChildren, numberOfInfants, numberOfElders, onSubmit, isLoading, error, submissionStatus, handleClose }){
    return (
        <>
            <FormStepBanner targetStep={3} setFormStep={setFormStep} />

            <Notifications 
                error={error} submissionStatus={submissionStatus} handleClose={handleClose} 
                successMessage="The refugee has been successfully registered."
            />

            <Flex flexDir="column" px="6" py="10">
                <Heading>
                    { familyOrIndividual==="individual" ? "Individual registration" : "Family registration"}
                </Heading>
                <Text fontSize="20px" fontWeight="500" pb="10">
                    { familyOrIndividual==="individual" ? "Confirm the details for this family." : "Confirm their details."}
                </Text>

                {/* Basic Details */}
                <Flex as="section" flexDir="column">
                    <Heading fontSize="20px" pb="3">Basic details</Heading>
                    <Flex as="dl" flexDir="column">
                        <DetailItem title="First name" value={primaryDetails.firstname} />
                        <Divider my="3" />
                        <DetailItem title="Surname" value={primaryDetails.surname} />
                        <Divider my="3" />
                        <DetailItem title="Date of birth" value={primaryDetails.DOB} />
                        <Divider my="3" />
                        <DetailItem title="United Nations Identity Number" value={primaryDetails.unID} />
                        <Divider my="3" />
                        <DetailItem title="Contact number" value={primaryDetails.contactNumber} />
                    </Flex>
                </Flex>

                {/* Family details - only for families */}
                {
                    familyOrIndividual==="family" && (
                        <Flex as="section" flexDir="column" pt="14">
                            <Heading fontSize="20px" pb="3">Family details</Heading>
                            <Flex as="dl" flexDir="column">
                                <DetailItem title="Adults" value={numberOfAdults} />
                                <Divider my="3" />
                                <DetailItem title="Children" value={numberOfChildren} />
                                <Divider my="3" />
                                <DetailItem title="Infants" value={numberOfInfants} />
                                <Divider my="3" />
                                <DetailItem title="Elders" value={numberOfElders} />
                            </Flex>
                        </Flex>
                    )
                }

                {/* Additional needs */}
                <Flex as="section" flexDir="column" py="10">
                    <Heading fontSize="20px" pb="3">Additional needs</Heading>
                    <Flex as="dl" flexDir="column">
                        <DetailItem title="Medical requirements" value={primaryDetails.medicalRequirements} />
                        <Divider my="3" />
                        <DetailItem title="Other special needs" value={primaryDetails.otherSpecialNeeds} />
                    </Flex>
                </Flex>


                <Button 
                        colorScheme="teal"
                        py="24px"
                        mt={familyOrIndividual==="individual" ? "auto" : "unset"}
                        type="submit"
                        onClick={onSubmit}
                        isLoading={isLoading}
                    >
                            Confirm
                </Button>
            </Flex>
        </>
    )
}