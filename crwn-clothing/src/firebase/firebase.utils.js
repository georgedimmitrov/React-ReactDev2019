import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { apiKey } from './firebase.key';

const config = {
  apiKey: apiKey,
  authDomain: 'crwn-db-f4c72.firebaseapp.com',
  databaseURL: 'https://crwn-db-f4c72.firebaseio.com',
  projectId: 'crwn-db-f4c72',
  storageBucket: 'crwn-db-f4c72.appspot.com',
  messagingSenderId: '426351000022',
  appId: '1:426351000022:web:86cbb6a5aed236f1054c77',
  measurementId: 'G-LNQ49ZS1GK'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
