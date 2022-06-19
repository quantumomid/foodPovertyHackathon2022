import { VStack } from "@chakra-ui/react";
import Navigation from "../components/Card/Navigation";

export default function Dashboard() {
  const navLinks = [
    { text: "Deliver a package", icon: "Package", path: "/deliver" },
    { text: "Search for a refugee", icon: "MagnifyingGlass", path: "/search" },
    { text: "Register a refugee", icon: "PlusCircle", path: "/register" },
    { text: "View all deliveries", icon: "Truck", path: "/packages" },
    { text: "My settings", icon: "GearSix", path: "/settings" }
  ];
  return (
    <VStack spacing={4} align="stretch" m="5">
      {navLinks.map((link, i) => (
        <Navigation key={i} text={link.text} color="black" path="login" icon={} />
      ))}
    </VStack>
  );
}
