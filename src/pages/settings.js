import { Flex, Heading, Button } from "@chakra-ui/react";
import NavBanner from "../components/NavBanner/NavBanner";
import { signOut } from "@firebase/auth";
import { auth } from "../../firebase/firebaseUtils";
import withAuthenticatedHOC from "../components/authentication/withAuthenticationHOC";

function SettingsPage(){

    const handleSignOut = async () => {
        try {
        await signOut(auth);
        } catch (error) {
        console.log(error);
        }
    };

    return (
        <>
            <NavBanner path="/dashboard" title="My settings" />
            <Flex flexDir="column" alignItems="center" justifyContent="center" pt="12" px="6">
                <Heading pb="8">username here</Heading>
                <Button onClick={handleSignOut} colorScheme="teal" width="full" my="26" >
                    Log out
                </Button>
            </Flex>
        </>
    )
}

export default withAuthenticatedHOC(SettingsPage);