import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyBj0KL57ik-bEVHk3zvZ5RaJ8U2f0XJPXY",
  authDomain: "crwn-clothing-e44ff.firebaseapp.com",
  projectId: "crwn-clothing-e44ff",
  storageBucket: "crwn-clothing-e44ff.appspot.com",
  messagingSenderId: "846887078514",
  appId: "1:846887078514:web:5877e0341bf716511090eb",
  measurementId: "G-NQ15GMTHKN",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
