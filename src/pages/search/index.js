import { Button, Flex, FormControl, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import NavBanner from "../../components/nav-banner/NavBanner";
import { useRouter } from "next/router";
import { setCurrentRecipient } from "../../../redux/user/userActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


export default function Search() {
    const [searchField, setSearchField] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();
    const tokenId = useSelector(state => state.user.currentUser?.tokenId);
    const handleSubmit = async ( e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/recipient/${searchField}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenId}`
                },
            });
            if (![ 200, 400].includes(response.status)){
                setError('Unable to search for users at this time. Please try again later')
                return;
            }
            const data =  await response.json();
           if (data.result == 'recipient not found'){
            setError("Recipient not found. Please try again using another ID or name")
            return;
           }
        dispatch(setCurrentRecipient(data));
            router.push(`users/${data.united_nations_id}`);
        } catch(error) {
            setError(error.message)  
            setSearchField("")   
       }
    }

    return (
        <Flex flexDir="column" >
            <form onSubmit={handleSubmit}>
            <NavBanner path="/search" title="Refugee search" content={
                 <FormControl px="30" py="5" id="refuregeeSearch" isRequired>
                {/* pressing enter should submit */}
                    <InputGroup>
                        <InputLeftElement pointerEvents='none' >
                            <BsSearch w={6} h={60}/>
                        </InputLeftElement>
                        <Input type="text" value={searchField} onChange={(e) => {
                            setSearchField(e.target.value)
                            setError('')
                            }} placeholder={` Name or united nations ID`} />
                    </InputGroup>
                </FormControl> } /> 

          <Text py="10" px="5" fontSize='xl'> 
          {error ? error :"Search for a refugee by name or United Nations ID." } </Text>
          <Flex  alignItems="center"  justifyContent={"center"} >
          <Button mx="5" position="fixed"
          bottom="200px"
                    colorScheme="teal"
                    type="submit" 
                    width="80vw"
                >
                    Search
                </Button>
                </Flex>
                </form>
        </Flex>
    )
}

