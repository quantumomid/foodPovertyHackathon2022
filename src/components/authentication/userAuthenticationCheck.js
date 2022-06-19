
import { onAuthStateChanged } from "@firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth } from "../../../firebase/firebaseUtils";

export const useAuthenticationCheck = () => {
    const router = useRouter();
    useEffect(() => {
        "On snapshot ran again"
        const unsubscribeFromAuth = onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log("User is logged in!")
            } else {
                console.log("No user is logged in!");
                // use .replace so that unauthenticated user cannot simply use back button to try and get back to dashboard page!
                router.replace("/");
            }
          });
          
        return () => unsubscribeFromAuth();
    }, [router]);
}