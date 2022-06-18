import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Creates a user profile document in the /users endpoint for an authorised user in firestore
// database to store email and username and other data which can then easily be accessed  
const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = doc(db, "users", userAuth.uid);
    const userSnap = await getDoc(userRef);

    //Therefore if the snapshot doesnt exist then we will create a new user 
    if (!userSnap.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()
        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            });
  
        } catch (error) {
            console.log('error creating user', error.message)
        }
    } else {
        // Authorised user ALREADY has user profile document
    }
    return userRef;
}

// Initialise Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp() ;

// Initialise firestore
const db = getFirestore();

// Initialise Auth
const auth = getAuth();

export { db, auth, createUserProfileDocument };