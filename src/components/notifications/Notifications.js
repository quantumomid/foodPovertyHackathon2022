
import { Alert, AlertTitle, AlertDescription, AlertIcon, CloseButton } from "@chakra-ui/react";

export default function Notifications({ submissionStatus, error, handleClose, successMessage }) {
    if (submissionStatus === "success" || error) {
        return (
            <Alert status={error ? "error" : "success"} maxW="600px" my={8}>
                <AlertIcon/>
                <AlertTitle>{error ? "Error!" : "Success!"}</AlertTitle>
                <AlertDescription>
                    {error ? 
                        error 
                        : 
                        successMessage
                    }
                </AlertDescription>
                <CloseButton position='absolute' right='8px' top='8px' onClick={handleClose} />
            </Alert>
        )
    }
    return <></>;
}