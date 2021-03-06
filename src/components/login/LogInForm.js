import { useState } from "react";
import { Flex, Button, ButtonGroup } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "@firebase/auth";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import { auth } from "../../../firebase/firebaseUtils";

import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUserTokenId } from "../../../redux/user/userActions";

export default function LogInForm() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLoginSubmit = async(e) => {
        e.preventDefault();
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            const tokenId = user._tokenResponse.idToken;
            dispatch(setUserTokenId(tokenId));            
            setEmail("");
            setPassword("");
            await router.push("/dashboard");
        } catch (error) {
            console.log(error);
        }
    }

    const handleCreateAccountClick = async(e) => {
        await router.push("/signup");
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
                    onClick={handleCreateAccountClick}
                >
                    Or create an account
                </Button>
            </ButtonGroup>
        </Flex>
    )
}