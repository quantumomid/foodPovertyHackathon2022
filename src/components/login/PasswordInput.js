import { FormControl, FormLabel, InputGroup, Input } from "@chakra-ui/react";

export default function PasswordInput({password, setPassword}) {
    return (
        <FormControl id='password' mb={2}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input 
                    name="password" id="passwordForLogin" type="password" bgColor="white"
                    value={password} onChange={(e) => setPassword(e.target.value)} 
                />
            </InputGroup>
        </FormControl>
    )
}