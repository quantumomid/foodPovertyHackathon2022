import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import FormPage0 from "./FormPage0";
import FormPage1 from "./FormPage1";
import FormPage2 from "./FormPage2";
import FormPage3 from "./FormPage3";
import RegistrationSummary from "./RegistrationSummary";

export default function RefugeeRegistration() {
    const [ formInputs, setFormInputs ] = useState({ 
        familyOrIndividual: "",
        camp: "",
        tentId: "",
     });

     const [ numberOfAdults, setNumberOfAdults ] = useState(0);
     const [ numberOfChildren, setNumberOfChildren ] = useState(0);
     const [ numberOfInfants, setNumberOfInfants ] = useState(0);
     const [ numberOfElders, setNumberOfElders ] = useState(0);

     const [ primaryDetails, setPrimaryDetails ] = useState({
        firstname: "",
        surname: "",
        DOB: "",
        unID: "",
        contactNumber: "",
        medicalRequirements: "",
        otherSpecialNeeds: "",
    })

     const [ formStep, setFormStep ] = useState(0);

    const handleFormInputChange = (e) => {
        const { name, value } = e.target;
        setFormInputs((currentFormInputs) => ({
            ...currentFormInputs,
            [name]: value
        }))
    }

    const handlePrimaryDetailsChange = (e) => {
        console.log(e)
        const { name, value } = e.target;
        setPrimaryDetails((currentPrimaryDetails) => ({
            ...currentPrimaryDetails,
            [name]: value
        }))
    }

    const renderFormStep = () => {
        switch(formStep) {
            case 1:
                return (
                    <FormPage1
                        familyOrIndividual={formInputs.familyOrIndividual.toLowerCase()}
                        primaryDetails={primaryDetails} 
                        handlePrimaryDetailsChange={handlePrimaryDetailsChange}
                        setFormStep={setFormStep} 
                    />
                );
            // FormPage2 is only for family (individuals go straight to step 3)
            case 2:
                return (
                    <FormPage2
                        numberOfAdults={numberOfAdults} setNumberOfAdults={setNumberOfAdults}
                        numberOfChildren={numberOfChildren} setNumberOfChildren={setNumberOfChildren}
                        numberOfInfants={numberOfInfants} setNumberOfInfants={setNumberOfInfants}
                        numberOfElders={numberOfElders} setNumberOfElders={setNumberOfElders}
                        primaryDetails={primaryDetails} 
                        handlePrimaryDetailsChange={handlePrimaryDetailsChange}
                        setFormStep={setFormStep} 
                    />
                );       
            case 3:
                return (
                    <FormPage3
                        familyOrIndividual={formInputs.familyOrIndividual.toLowerCase()}
                        primaryDetails={primaryDetails} 
                        handlePrimaryDetailsChange={handlePrimaryDetailsChange}
                        setFormStep={setFormStep} 
                    />
                );
            case 4:
                return (
                    <RegistrationSummary
                        familyOrIndividual={formInputs.familyOrIndividual.toLowerCase()}
                        formInputs={formInputs}
                        primaryDetails={primaryDetails}
                        numberOfAdults={numberOfAdults} 
                        numberOfChildren={numberOfChildren} 
                        numberOfInfants={numberOfInfants} 
                        numberOfElders={numberOfElders} s
                        setFormStep={setFormStep} 
                    />
                );                    
            case 0:
            default:
                return (
                    <FormPage0 
                        formInputs={formInputs} 
                        handleFormInputChange={handleFormInputChange}
                        setFormStep={setFormStep} 
                    />
                );
        }
    }

    return (
        <Flex flexDir="column">
            {renderFormStep()}
        </Flex>
    )
}