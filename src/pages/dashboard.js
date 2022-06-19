import { VStack, Box, Heading } from "@chakra-ui/react";
import Navigation from "../components/Card/Navigation";
import { BsBoxSeam, BsGear, BsSearch, BsPlusCircle, BsTruck } from "react-icons/bs";

export default function Dashboard() {
  const navLinks = [
    { text: "Deliver a package", icon: <BsBoxSeam />, path: "/deliver" },
    { text: "Search for a refugee", icon: <BsSearch />, path: "/search" },
    { text: "Register a refugee", icon: <BsPlusCircle />, path: "/register" },
    { text: "View all deliveries", icon: <BsTruck />, path: "/packages" },
    { text: "My settings", icon: <BsGear />, path: "/settings" }
  ];
  return (
    <VStack spacing={4} align="stretch" m="5" mt="20">
      <Heading>username here</Heading>
      {navLinks.map((link, i) => (
        <Navigation key={i} text={link.text} color="black" path={link.path} icon={link.icon} />
      ))}
    </VStack>
  );
}
