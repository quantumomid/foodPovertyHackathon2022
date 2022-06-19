import { Flex, Spinner, Text, Icon , Button, Heading, VStack, Divider, Box} from "@chakra-ui/react";
import  { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsPersonFill } from "react-icons/bs";

export default function UserPage() {
    const [userData, setUserData] = useState(null)
    const [error, setError] = useState("");
    const {query, isReady} = useRouter();
    const {userId} =  query
    const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
          const response =   await fetch(`https://us-central1-foodpovertyhackathon.cloudfunctions.net/api/recipient/id1`) 

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

  if (!userId  || !userData && !error){
    return < Spinner mt={"30vh"} ml={"40vw"} p={30}/>
  }
/*
user data:
Name
Package history

Location info:
camp
tent



*/

    return (
        <Flex flexDir="column" >

          {error  && !userData && <Text>{error}</Text>}
         {userData && 
          <Flex direction="column">
              <Flex px="20" pb="20" pt="10" direction="column" alignItems={"center"} justifyContent={"center"} >
              <Icon w={160} h={160} as={ BsPersonFill } color='#319795'/>  
              <Text fontSize={"24"} fontWeight={"bold"}> {userData.name} { userData.surname}</Text>
              <Button colorScheme="teal" onClick={() => router.push('/deliver')} > Deliver a package</Button>
           </Flex>

        <VStack 
          pl="5" 
          spacing={10}
          align='stretch'>
             <VStack 
                spacing={4}
                align='stretch'>
                    <Heading size={"md"}>
                        Package delivery history
                    </Heading>

{/* map through  first 3 deliver history here  */}
{/*  if we want box shadow */}
<Box color={"#6B7280"}>
      <Text fontSize='s' > date here 12/06/2022</Text>
      <Text colour={"grey.900"}>Basic Universal Pack</Text>
      <Divider color="#52B788"/>
    </Box>

    <Box color={"#6B7280"}>
      <Text fontSize='s' > date here 12/06/2022</Text>
      <Text colour={"grey.900"}>Basic Universal Pack</Text>
    </Box>
    <Divider color="#52B788"/>

    <Box color={"#6B7280"}>
      <Text fontSize='s' > date here 12/06/2022</Text>
      <Text colour={"grey.900"}>Basic Universal Pack</Text>
    </Box>
    <Divider color="#52B788"/>

    <Button colorScheme="teal" onClick={() => router.push('/history')} size='sm' width={"40vw"}> View full history</Button>

</VStack>

<VStack 
  spacing={4}
  align='stretch'>
    
<Heading size={"md"}>
Location information
</Heading>

{/* map through  first 3 deliver history here  */}
{/*  if we want box shadow */}
<Box color={"#6B7280"}>
      <Text fontSize='s' > date here 12/06/2022</Text>
      <Text colour={"grey.900"}>Basic Universal Pack</Text>
    </Box>
    <Divider color="#52B788"/>

    <Box color={"#6B7280"}>
      <Text fontSize='s' > date here 12/06/2022</Text>
      <Text colour={"grey.900"}>Basic Universal Pack</Text>
    </Box>
    <Divider color="#52B788"/>

  
</VStack>

<VStack 
  spacing={4}
  align='stretch'>
    
<Heading size={"md"}>
Basic details</Heading>

{/* map through  first 3 deliver history here  */}
{/*  if we want box shadow */}
<Box color={"#6B7280"}>
      <Text fontSize='s' > date here 12/06/2022</Text>
      <Text colour={"grey.900"}>Basic Universal Pack</Text>
    </Box>
    <Divider color="#52B788"/>

    <Box color={"#6B7280"}>
      <Text fontSize='s' > date here 12/06/2022</Text>
      <Text colour={"grey.900"}>Basic Universal Pack</Text>
    </Box>
    <Divider color="#52B788"/>

    <Box color={"#6B7280"}>
      <Text fontSize='s' > date here 12/06/2022</Text>
      <Text colour={"grey.900"}>Basic Universal Pack</Text>
    </Box>
    <Divider color="#52B788"/>

    <Button colorScheme="teal" onClick={() => router.push('/history')} size='sm' width={"40vw"}> View full history</Button>

</VStack><VStack 
  spacing={4}
  align='stretch'>
    
<Heading size={"md"}>
Family details</Heading>

{/* map through  first 3 deliver history here  */}
{/*  if we want box shadow */}
<Box color={"#6B7280"}>
      <Text fontSize='s' > date here 12/06/2022</Text>
      <Text colour={"grey.900"}>Basic Universal Pack</Text>
    </Box>
    <Divider color="#52B788"/>

    <Box color={"#6B7280"}>
      <Text fontSize='s' > date here 12/06/2022</Text>
      <Text colour={"grey.900"}>Basic Universal Pack</Text>
    </Box>
    <Divider color="#52B788"/>

    <Box color={"#6B7280"}>
      <Text fontSize='s' > date here 12/06/2022</Text>
      <Text colour={"grey.900"}>Basic Universal Pack</Text>
    </Box>
    <Divider color="#52B788"/>

    <Button colorScheme="teal" onClick={() => router.push('/history')} size='sm' width={"40vw"}> View full history</Button>

</VStack><VStack 
  spacing={4}
  align='stretch'>
    
<Heading size={"md"}>
Additional needs</Heading>

{/* map through  first 3 deliver history here  */}
{/*  if we want box shadow */}
<Box >
      <Text color={"#6B7280"} fontSize='s' fontWeight={"bold"} mt={"0"} pb={"0"} > date here 12/06/2022</Text>
      <Text color={"grey.900"}>Basic Universal Pack</Text>
    </Box>
    <Divider color="#52B788"/>

    <Box color={"#6B7280"}>
      <Text color={"#6B7280"} fontSize='s' > date here 12/06/2022</Text>
      <Text color={"grey.900"}>Basic Universal Pack</Text>
    </Box>
    <Divider color="#52B788"/>

    <Box color={"#6B7280"}>
      <Text  color={"#6B7280"} fontSize='s' > date here 12/06/2022</Text>
      <Text color={"grey.900"}>Basic Universal Pack</Text>
    </Box>
    <Divider color="#52B788"  />

    <Button colorScheme="teal" onClick={() => router.push('/history')} size='sm' width={"40vw"}> View full history</Button>

</VStack>
</VStack>
        </Flex>
        
        
        }

        
        </Flex>
    )
}

