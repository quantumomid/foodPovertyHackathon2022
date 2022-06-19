
import { useSelector } from "react-redux";
import { Heading, Flex } from "@chakra-ui/react";
import { useAuthenticationCheck } from "./userAuthenticationCheck";

export default function withAuthenticatedHOC (WrappedComponent) {

    const WrappedWithAuthentication = ({ ...props }) => {
        const currentUser = useSelector((state) => state.user.currentUser);

        // Use custom hook for ensuring this page only shows for authenticated users
        useAuthenticationCheck();
        
        if(!currentUser){
            return (
                <Flex as="main" direction="column" p={3} alignItems="center" minH="90vh" bgColor="#FAFAFA" shadow="0 -7px 7px -5px #333322bd">
                    <Heading as="h3">Please wait while we authenticate you.</Heading>
                </Flex>
            )
        }
        return <WrappedComponent {...props} />
    }

    return WrappedWithAuthentication;
}