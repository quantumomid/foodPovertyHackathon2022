import { Flex, Spinner, Text, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";

export default function UserPage() {
    const [userData, setUserData] = useState(null)
    const [error, setError] = useState("");
    const {query, isReady} = useRouter();
    const {userId} =  query

console.log('userId', userId);
  useEffect(() => {
    const fetchData = async () => {
          const response =   await fetch(`https://us-central1-foodpovertyhackathon.cloudfunctions.net/api/recipient/${userId}`) 
        if (![ 200, 400].includes(response.status)){
            setError('Unable to search for users at this time. Please try again later')
            return;
        }
        
        const data =  await response.json();
        console.log(userId,isReady, data, 'data');
       if (data.result === 'recipient not found'){
        setError("Recipient not found. Please try again using another ID or name")
        return;
       }     
     setUserData(data)
     setError("")
    }
    fetchData();
  }, [userId, isReady]);

  console.log(userId, '---------!!!--')
  if (!userId  || !userData && !error){
    return < Spinner/>
  }
  console.log(userData);
/*
user data:
Name
Package history

Location info:
camp
tent



*/

    return (
        <Flex flexDir="column" p="20">

        {error  && !userData && <Text>{error}</Text>}
        {userData && <Flex direction="column" alignContent={"center"} justifyContent={"center"} ><Icon w={100} h={100} as={     BsPersonCircle }/>  
        <Text> {userData.name} { userData.surname}</Text></Flex>}
        </Flex>
    )
}

