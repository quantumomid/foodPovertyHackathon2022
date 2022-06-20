import { Box, Button, Divider, Flex, Text,  } from "@chakra-ui/react";
import { signOut } from "@firebase/auth";
import { useSelector } from "react-redux";
import { auth } from "../../firebase/firebaseUtils";
import withAuthenticatedHOC from "../components/authentication/withAuthenticationHOC";
import NavBanner from "../components/nav-banner/NavBanner";

function SettingsPage() {
    const user = useSelector(state => state.user.currentUser);
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
                <Box >
                    <Text fontSize='l' fontWeight={"medium"}> Name: {user.firstName} {user.lastName}</Text>
                    <Text fontSize='l' colour={"#1E1E1E"}>Email: {user.email}</Text>
                    <Text fontSize='l' colour={"#1E1E1E"} mb={3}>Charity: {user.volunteerCharity ? user.volunteerCharity : "One Nation"}</Text>
                    <Divider color="#52B788" />
                </Box>
                <Button onClick={handleSignOut} colorScheme="teal" width="full" my="26" >
                    Log out
                </Button>
            </Flex>
        </>
    )
}

export default withAuthenticatedHOC(SettingsPage);