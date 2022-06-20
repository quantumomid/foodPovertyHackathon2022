import { useEffect, useState } from "react";
import { Box, Divider, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import NavBanner from "../../../components/nav-banner/NavBanner";

const ReusableInfoCard = ({ title, deliveredOn, deliveredBy, charity }) => {
    return (
        <Box pt={"5"} >
            <Heading fontSize='s' fontWeight={"bold"} color="#319795">{title}</Heading>
            <Flex >
                <Text pr="2" fontSize='s' color={"#A0AEC0"}> Delivered on  {" "}  </Text>
                <Text fontSize='s' > {deliveredOn}  </Text>
            </Flex>

            <Flex>
                <Text pr="2" fontSize='s' color={"#A0AEC0"}> Delivered by  {" "}  </Text>
                <Text fontSize='s' > {deliveredBy}  </Text>
            </Flex>

            <Flex>
                <Text pr="2" fontSize='s' color={"#A0AEC0"}> Charity  {" "}  </Text>
                <Text fontSize='s' > {charity}  </Text>
            </Flex>
            <Divider pt={"5"} color="#52B788" />
        </Box>

    )
}
export default function History() {
    const [userData, setUserData] = useState(null)
    const { query, isReady } = useRouter();
    const { userId } = query
    const tokenId = useSelector(state => state.user.currentUser?.tokenId);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/recipient/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenId}`
        },
      });
     
      const data = await response.json();
      console.log(data);
    if (!data){
        return;
    }
      setUserData(data)
  
    }
    fetchData();
  }, [userId, isReady, tokenId]);

    return (
        <Flex flexDir="column" pb={"20"}>
            <NavBanner title="Delivery history" />
            {userData && <Heading pt="10" px="6" size="md">
                Package delivery history for {userData.name}  {userData.surname}
            </Heading>}
            <VStack
                pl="5"
                pt={"5"}
                align='stretch'>

                <ReusableInfoCard title="Basic Universal Pack" deliveredOn={"12/06/2022"} deliveredBy={"Radi Choudhury"} charity="One Nation" />
                <ReusableInfoCard title="Infant Pack (2)" deliveredOn={"12/05/2022"} deliveredBy={"Khadija Nur"} charity="Muslim Hands" />
                <ReusableInfoCard title="Csustom Pack" deliveredOn={"12/04/2022"} deliveredBy={"Ameera Al-shaibani"} charity="One Nation" />
                <ReusableInfoCard title="Basic Universal Pack" deliveredOn={"12/02/2022"} deliveredBy={"Omid Wakili"} charity="Muslim Hands" />
                <ReusableInfoCard title="Winter Pack" deliveredOn={"12/12/2021"} deliveredBy={"Mashkoor Ahmed"} charity="One Nation" />
            </VStack>
        </Flex>
    )
}
