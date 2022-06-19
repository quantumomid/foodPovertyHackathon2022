import { FormControl, FormLabel, InputGroup, Input } from "@chakra-ui/react";

export default function EmailInput({email, setEmail}) {
    return (
        <FormControl id='email' mb={2} py="10">
            <FormLabel>Email address</FormLabel>
            <InputGroup>
                <Input 
                    name="email" id="emailForLogin" type="email" 
                    placeholder="example@email.com" bgColor="white"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </InputGroup>
        </FormControl>
    )
}