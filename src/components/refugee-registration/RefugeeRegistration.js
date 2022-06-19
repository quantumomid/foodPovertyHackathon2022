import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import NavBanner from "../nav-banner/NavBanner";
import FormPage0 from "./FormPage0";

export default function RefugeeRegistration() {
    const [ formInputs, setFormInputs ] = useState({ 
        familyOrIndividual: "",
        camp: "",
        tentId: "",
     });

     const [ formStep, setFormStep ] = useState(0);

    const handleFormInputChange = (e) => {
        const { name, value } = e.target;
        setFormInputs((currentFormInputs) => ({
            ...currentFormInputs,
            [name]: value
        }))
    }

    const renderFormStep = () => {
        switch(formStep) {
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
            <NavBanner path="" title="Refugee registration" />
            {renderFormStep()}
        </Flex>
    )
}