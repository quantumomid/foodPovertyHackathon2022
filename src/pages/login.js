import { Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import LogInForm from "../components/login/LogInForm";
import NavBanner from "../components/NavBanner/NavBanner";

export default function LogInPage() {
    const router = useRouter();
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        if(currentUser) router.replace("/dashboard");
    }, [currentUser, router]);

    return (
        <Flex flexDir="column">
            <NavBanner path="/" title="AcceleraidAid" />
            <Heading pt="10" px="6" fontSize="24px">
                Log in to your volunteer account
            </Heading>
            <LogInForm />
        </Flex>
    )
}