import { useState } from "react";
import { Flex, Button, ButtonGroup } from "@chakra-ui/react";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";

export default function LogInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Flex as="form" flexDir="column" px="5" h="70vh">
            <EmailInput email={email} setEmail={setEmail} />
            <PasswordInput password={password} setPassword={setPassword} />
            <ButtonGroup 
                flexDir="column" mt="auto"
                gap="4"
            >
                <Button 
                    colorScheme="teal" 
                >
                    Log in
                </Button>
                <Button bg="transparent" color="teal" fontSize="18px" fontWeight="600">
                    Or create an account
                </Button>
            </ButtonGroup>
        </Flex>
    )
}