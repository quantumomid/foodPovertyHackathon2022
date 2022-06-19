import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, Text } from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { auth } from "../../firebase/firebaseUtils";

export default function Signup() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [volunteerCharity, setVolunteerCharity] = useState("");
  const [volunteerCamp, setVolunteerCamp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();
    try {
      console.log(email, password);
      await createUserWithEmailAndPassword(auth, email, password);
      //  save user to firestore here
      /* 

       const user = auth().currentUser;
        await user.updateProfile({
          displayName: username,
        });
      
     
        const uniqueUserId = auth().currentUser?.uid;
       await db.collection("users").doc(uniqueUserId).set({
          email: email,
          forename: firstName,
          surname: lastName,
          charity: volunteerCharity
          camp: volunteerCamp       
      */
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setVolunteerCharity("");
      setVolunteerCamp("");
      router.push("/dashboard");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  // const rememberMe = () => {
  //   auth().setPersistence(e.target.checked ? auth.Auth.Persistence.LOCAL : auth.Auth.Persistence.SESSION);
  // };

  return (
    <Flex flexDir="column" alignItems="start" py="10" px="8">
      <Heading pb="4" size="md">
        Create a volunteer account
      </Heading>
      <form onSubmit={handleSubmit}>
        <Text mb="4px" mt="8px" fontWeight="bold">
          Enter your details below:
        </Text>
        <FormControl gap="36" isRequired isInvalid={error}>
          <FormControl mt="30px" id="firstName" isRequired>
            <FormLabel mb="0">First name</FormLabel>
            <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </FormControl>

          <FormControl mt="30px" id="lastName" isRequired>
            <FormLabel mb="0">Last name</FormLabel>
            <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </FormControl>

          <FormControl mt="30px" id="email" isRequired>
            <FormLabel mb="0">Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>

          <FormControl mt="30px" id="password" isRequired>
            <FormLabel mb="0">Create password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>

          <FormControl mt="30px" id="charity">
            <Text mb="0" mt="8px" fontWeight="medium">
              Which charity are you voluteering for?
            </Text>
            <Select placeholder={volunteerCharity} onChange={(e) => setVolunteerCharity(e.target.value)}>
              {/* this would be an arrray coming from what we have in the db */}
              {/*  array.map(....) */}
              <option value="option1">One Nation</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </FormControl>

          <FormControl mt="30px" id="charity">
            <Text mb="0" mt="8px" fontWeight="medium">
              Which camp are you voluteering in?
            </Text>
            <Select placeholder={volunteerCamp} onChange={(e) => setVolunteerCamp(e.target.value)}>
              {/* this would be an arrray coming from what we have in the db */}
              {/*  array.map(....) */}
              <option value="option1">Lebanon inner city camp</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </FormControl>

          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
        {/* make this use firabsae auth */}
        <Button colorScheme="teal" width="83vw" my="26" type="submit">
          Create account
        </Button>
      </form>
    </Flex>
  );
}
