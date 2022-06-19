import { Flex, Heading, VStack ,Box, Text, Divider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NavBanner from "../../../components/nav-banner/NavBanner";

const ReusableInfoCard = ({title, deliveredOn, deliveredBy, charity}) => {
    return (
        <Box   pt={"5"} >
        <Heading fontSize='s'fontWeight={"bold"} color="#319795">{title}</Heading>
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
              <Divider  pt={"5"}color="#52B788"/>
      </Box>

    )
}
export default function History() {
    const router = useRouter();
  

    return (
        <Flex flexDir="column" pb={"20"}>
            <NavBanner path="/" title="Delivery history" />
            <Heading pt="10" px="6" size="md">
            Package delivery history for Mohamad Salah.
            </Heading>
            <VStack
            pl="5"
            pt={"5"}
            align='stretch'>
          
<ReusableInfoCard title="Basic Universal Pack" deliveredOn={"12/06/2022"} deliveredBy={"Radi Choudhury"} charity="One Nation"/>
<ReusableInfoCard title="Infant Pack (2)" deliveredOn={"12/05/2022"} deliveredBy={"Radi Choudhury"} charity="One Nation"/>
<ReusableInfoCard title="Csustom Pack" deliveredOn={"12/04/2022"} deliveredBy={"Radi Choudhury"} charity="One Nation"/>
<ReusableInfoCard title="Basic Universal Pack" deliveredOn={"12/02/2022"} deliveredBy={"Radi Choudhury"} charity="One Nation"/>
<ReusableInfoCard title="Winter Pack" deliveredOn={"12/12/2021"} deliveredBy={"Radi Choudhury"} charity="One Nation"/>
            </VStack>
        </Flex>
    )
}
