import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import FormPage0 from "./FormPage0";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import Notifications from "../notifications/Notifications";
/*import FormPage1 from "./FormPage1";
import FormPage2 from "./FormPage2";
import FormPage3 from "./FormPage3";
import RegistrationSummary from "./DeliverPackageSummary"; */

export default function DeliverPackage() {
    const router = useRouter();
    const tokenId = useSelector(state => state.user.currentUser?.tokenId);
    const user = useSelector(state => state.user.currentUser);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [submissionStatus, setSubmissionStatus] = useState("");

    const handleClose = () => {
        setError("");
        setSubmissionStatus("");
    }

    const initialFormInputs = {
        recipientName: "",
        recipientCode: "",
        tentCode:"tentCode",
        campCode:"campCode",
        charityCode: user?.profile?.volunteerCharity,
        staffForename: user?.profile?.firstName,
        staffSurname: user?.profile?.lastName,
        staffEmail: user?.email,
        description:"description",
    };

    const [formInputs, setFormInputs] = useState(initialFormInputs);

     const [noOfPackages, setNoOfPackages] = useState(1);
     const [items, setItems] = useState([]);

    const [ formStep, setFormStep ] = useState(0);

    const handleFormInputChange = (e) => {
        const { name, value } = e.target;
        setFormInputs((currentFormInputs) => ({
            ...currentFormInputs,
            [name]: value
        }))
    }

    const onConfirmDeliverPackage = async () => {
        try {
            const requestBody = {
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
                staff: {
                    forename: formInputs.staffForename,
                    surname: formInputs.staffSurname,
                    email: formInputs.email
                },
                packageType: formInputs.packageType,
                quantity: noOfPackages,
                description: formInputs.description,
                items: items
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/distributions/${formInputs.recipientCode}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenId}`
                },
                body: JSON.stringify(requestBody),
            });

            if (response && response.ok) {
                setFormInputs(initialFormInputs);
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
            <Notifications error={error} submissionStatus={submissionStatus} handleClose={handleClose}
                           successMessage="The refugee has been successfully registered."
            />
        </Flex>
    )
}