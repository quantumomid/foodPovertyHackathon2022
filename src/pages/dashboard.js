import { Fade, VStack, Heading } from "@chakra-ui/react";
import { BsBoxSeam, BsGear, BsPlusCircle, BsSearch, BsTruck } from "react-icons/bs";
import withAuthenticatedHOC from "../components/authentication/withAuthenticationHOC";
import Navigation from "../components/Card/Navigation";
import Banner from "../components/dashboard-banner/Banner";
import { useSelector } from "react-redux";

function DashboardPage() {
  const user = useSelector(state => state.user.currentUser);
  const navLinks = [
    { text: "Deliver a package", icon: <BsBoxSeam />, path: "/deliver" },
    { text: "Search for a refugee", icon: <BsSearch />, path: "/search" },
    { text: "Register a refugee", icon: <BsPlusCircle />, path: "/register" },
    { text: "View all deliveries", icon: <BsTruck />, path: "/packages" },
    { text: "My settings", icon: <BsGear />, path: "/settings" }
  ];

  return (
    <>
      <Banner heading="My Dashboard" />
      <Fade in={"true"}  style={{ transitionDuration: "300ms" }}>
      <VStack spacing={4} align="stretch" m="5" mt="20">
        <Heading size="md" colour={"grey"} >{user.firstName} {user.lastName}</Heading>
        {navLinks.map((link, i) => (
          <Navigation key={i} text={link.text} color="black" path={link.path} icon={link.icon} />
        ))}
       
      </VStack>
      </Fade>
    </>
  );
}

export default withAuthenticatedHOC(DashboardPage)