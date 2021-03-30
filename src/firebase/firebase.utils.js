import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const config = {
    apiKey: "AIzaSyBsdT_RMatpT_DHOiatAf29T4beQzJwrkY",
    authDomain: "react-ecommerce-project-8237e.firebaseapp.com",
    projectId: "react-ecommerce-project-8237e",
    storageBucket: "react-ecommerce-project-8237e.appspot.com",
    messagingSenderId: "894180614339",
    appId: "1:894180614339:web:63d4eccd63d79f876bc276",
    measurementId: "G-BBWXH6Q6TP"
  };

  export const createUserProfileDocument =  async(userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ... additionalData

        })

      } catch(error){
        console.log('error creating user', error.message);
      }
    }

    return userRef;
    
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;