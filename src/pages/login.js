import { Flex, Heading } from "@chakra-ui/react";
import LogInForm from "../components/login/LogInForm";
import NavBanner from "../components/nav-banner/NavBanner";

export default function LogInPage() {


    return (
        <Flex flexDir="column">
            <NavBanner path="/" title="Company name" />
            <Heading pt="10" px="6" fontSize="24px">
                Log in to your volunteer account
            </Heading>
            <LogInForm />

        </Flex>
    )
}