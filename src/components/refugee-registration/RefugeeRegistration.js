import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Notifications from "../notifications/Notifications";
import FormPage0 from "./FormPage0";
import FormPage1 from "./FormPage1";
import FormPage2 from "./FormPage2";
import FormPage3 from "./FormPage3";
import RegistrationSummary from "./RegistrationSummary";

export default function RefugeeRegistration() {
    const router = useRouter();

    const initialFormInputs = { 
        familyOrIndividual: "",
        camp: "",
        tentId: "",
    }
    const [ formInputs, setFormInputs ] = useState(initialFormInputs);

     const [ numberOfAdults, setNumberOfAdults ] = useState(0);
     const [ numberOfChildren, setNumberOfChildren ] = useState(0);
     const [ numberOfInfants, setNumberOfInfants ] = useState(0);
     const [ numberOfElders, setNumberOfElders ] = useState(0);

     const initialPrimaryDetails = {
        firstname: "",
        surname: "",
        DOB: "",
        unID: "",
        contactNumber: "",
        medicalRequirements: "",
        otherSpecialNeeds: "",
    }
     const [ primaryDetails, setPrimaryDetails ] = useState(initialPrimaryDetails)

     const [ formStep, setFormStep ] = useState(0);

     const [isLoading, setIsLoading] = useState(false);
     const [error, setError] = useState("");
     const [submissionStatus, setSubmissionStatus] = useState("");

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setIsLoading(true);
        setError("");
        setSubmissionStatus("");

        const requestBody = {
            united_nations_id: primaryDetails.unID,
            category: formInputs.familyOrIndividual,
            forename: primaryDetails.firstname,
            surname: primaryDetails.surname,
            notes: [
                primaryDetails.medicalRequirements,
                primaryDetails.otherSpecialNeeds,
            ]
        }
        if (formInputs.familyOrIndividual.toLowerCase()==="family") {
            requestBody.members= {
                parents: numberOfAdults,
                children: numberOfChildren,
                elderly: numberOfElders,
                infant: numberOfInfants
            }
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/recipient`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response && response.ok) {
                setFormInputs(initialFormInputs);
                setPrimaryDetails(initialPrimaryDetails);
                setSubmissionStatus("success");
                setIsLoading(false);
                router.push("/dashboard");
            } else {
                const responseJSON = await response.json();
                setError(responseJSON.result);
                setIsLoading(false);
            }

        } catch (error) {
            console.log(error);
            setError(error.message);
            setIsLoading(false);
        }
    }

    const handleClose = () => {
        setError("");
        setSubmissionStatus("");
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
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
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
            <Notifications error={error} submissionStatus={submissionStatus} handleClose={handleClose} 
                successMessage="The refugee has been successfully registered."
            />
        </Flex>
    )
}