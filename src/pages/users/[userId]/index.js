import { Flex, Spinner, Text, Icon, Button, Heading, VStack, Divider, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import UserInfoCard from '../../../components/Card/UserInfoCard'
import NavBanner from "../../../components/nav-banner/NavBanner";

export default function UserPage() {
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState("");
  const { query, isReady } = useRouter();
  const { userId } = query
  const router = useRouter();
  const tokenId = useSelector(state => state.user.currentUser?.tokenId);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://us-central1-foodpovertyhackathon.cloudfunctions.net/api/recipient/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenId}`
        },
      });
      console.log(response);
      if (![200, 400].includes(response.status)) {
        setError('Unable to search for users at this time. Please try again later')
        return;
      }

      const data = await response.json();
      console.log(data);
      if (data.result === 'recipient not found') {
        setError("Recipient not found. Please try again using another ID or name")
        return;
      }
      setUserData(data)
      setError("")
    }
    fetchData();
  }, [userId, isReady, tokenId]);

  if (!userId || !isReady || !userData && !error) {
    return < Spinner mt={"30vh"} ml={"40vw"} p={30} />
  }

  return (
    <Flex flexDir="column" pb={20} >
            <NavBanner path="/search" title="Refugee details" />

      {error && !userData && <Text>{error}</Text>}
      {userData &&
        <Flex direction="column">
          <Flex px="20" pb="20" pt="10" direction="column" alignItems={"center"} justifyContent={"center"} >
            <Icon w={160} h={160} as={BsPersonFill} color='#319795' />
            <Text fontSize={"24"} fontWeight={"bold"}> {userData.name} {userData.surname}</Text>
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
              <UserInfoCard topText="12/06/2022" bottomText="Basic Universal Pack" />
              <UserInfoCard topText="12/05/2022" bottomText="Basic Universal Pack" />
              <UserInfoCard topText="12/05/2022" bottomText="Baby Pack" />
              <Button colorScheme="teal" onClick={() => router.push(`${userId}/history`)} size='sm' width={"40vw"}> View full history</Button>
            </VStack>

            <VStack
              spacing={4}
              align='stretch'>
              <Heading size={"md"}>
                Location information
              </Heading>
              <UserInfoCard topText="Camp" bottomText={userData.camp} />
              <UserInfoCard topText="Tent ID" bottomText={userData.tent} />
            </VStack>

            <VStack
              spacing={4}
              align='stretch'>
              <Heading size={"md"}>
                Basic details</Heading>
              <UserInfoCard topText="United Nations Identity Number" bottomText={userData.united_nations_id} />
              <UserInfoCard topText="Date of birth" bottomText="15/06/1992" />
              <UserInfoCard topText="Contact number" bottomText={userData.contact_number} />
            </VStack>
            
            <VStack
              spacing={4}
              align='stretch'>
              <Heading size={"md"}>
                Family details</Heading>
                <UserInfoCard topText="Adults" bottomText="3" />
              <UserInfoCard topText="Children" bottomText="5" />
                <UserInfoCard topText="Infants" bottomText="1" />
              <UserInfoCard topText="Elders" bottomText="1" />
            </VStack>
            
            <VStack
              spacing={4}
              align='stretch'>
              <Heading size={"md"}>
                Additional needs</Heading>
                <UserInfoCard topText="Medical requirements" bottomText="Mother has type 2 diabetes, she requires insulin" />
                <UserInfoCard topText="Other special needs" bottomText="N/A" />

            </VStack>
          </VStack>
        </Flex>


      }


    </Flex>
  )
}

