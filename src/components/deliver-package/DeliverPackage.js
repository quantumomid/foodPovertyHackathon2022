import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import FormPage0 from "./FormPage0";
import {useRouter} from "next/router";
/*import FormPage1 from "./FormPage1";
import FormPage2 from "./FormPage2";
import FormPage3 from "./FormPage3";
import RegistrationSummary from "./DeliverPackageSummary"; */

export default function DeliverPackage() {
    const router = useRouter();
    const [formInputs, setFormInputs] = useState({
        refugeeName: "test",
        refugeeCode: "id1",
        tentCode:"test",
        campCode:"test",
        charityCode:"test",
        staffName:"test",
        staffForename: "test",
        staffSurname: "test",
        staffEmail: "test",
        description:"test",
     });

     const [noOfPackages, setNoOfPackages] = useState(1);
     const [items, setItems] = useState([]);

     const [recipientDetails, setRecipientDetails ] = useState({
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
        const { name, value } = e.target;
        setPrimaryDetails((currentPrimaryDetails) => ({
            ...currentPrimaryDetails,
            [name]: value
        }))
    }

    const onConfirmDeliverPackage = () => {
        let url = 'https://us-central1-foodpovertyhackathon.cloudfunctions.net/api/distributions/'+ formInputs.refugeeCode;
        let options = {
            method: 'POST',
            //mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                recipient: {
                    code: formInputs.refugeeCode
                },
                tent: {
                    code: formInputs.tentCode,
                    camp: {
                        code: formInputs.campCode
                    }
                },
                charity: {
                    code: formInputs.charityCode
                },
                staff : {
                    forename: formInputs.staffForename,
                    surname: formInputs.staffSurname,
                    email: formInputs.email
                },
                packageType: formInputs.packageType,
                quantity: noOfPackages,
                description: formInputs.description,
                items: items
            })
        };

        fetch(url, options).then(
            response => {
                if (response && response.ok) {
                    //TODO show banner on other page saying success package delivered
                    let data =  response.json();
                    // do something with data
                    router.push('/dashboard');
                }
            }
        ).catch(error => {
            //TODO do something
            error.log("Failed deliver package request: " + error);
        })
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
                        noOfPackages={noOfPackages}
                        setNoOfPackages={setNoOfPackages}
                        onConfirmDeliverPackage={onConfirmDeliverPackage}
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