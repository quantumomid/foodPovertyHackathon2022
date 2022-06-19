import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import FormPage0 from "./FormPage0";
import FormPage1 from "./FormPage1";

export default function RefugeeRegistration() {
    const [ formInputs, setFormInputs ] = useState({ 
        familyOrIndividual: "",
        camp: "",
        tentId: "",
     });

     const [ primaryDetails, setPrimaryDetails ] = useState({
        firstname: "",
        surname: "",
        DOB: "",
        unID: "",
        contactNumber: ""
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
                        primaryDetails={primaryDetails} 
                        handlePrimaryDetailsChange={handlePrimaryDetailsChange}
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