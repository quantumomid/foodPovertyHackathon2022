import { useState } from "react";
import { Flex, Button, ButtonGroup } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "@firebase/auth";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import { auth } from "../../../firebase/firebaseUtils";

export default function LogInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginSubmit = async(e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setEmail("");
            setPassword("");

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <Flex as="form" flexDir="column" px="5" h="70vh" onSubmit={handleLoginSubmit}>
            <EmailInput email={email} setEmail={setEmail} />
            <PasswordInput password={password} setPassword={setPassword} />
            <ButtonGroup 
                flexDir="column" mt="auto"
                gap="4"
            >
                <Button 
                    colorScheme="teal"
                    type="submit" 
                >
                    Log in
                </Button>
                <Button 
                    bg="transparent" color="teal" fontSize="18px" fontWeight="600"
                >
                    Or create an account
                </Button>
            </ButtonGroup>
        </Flex>
    )
}