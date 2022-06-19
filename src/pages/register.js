import withAuthenticatedHOC from "../components/authentication/withAuthenticationHOC";
import RefugeeRegistration from "../components/refugee-registration/RefugeeRegistration";

function RegisterRefugeePage() {
    return <RefugeeRegistration />
}

export default withAuthenticatedHOC(RegisterRefugeePage)