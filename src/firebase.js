
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/auth';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBlCSvYj6ZzIlnSg5Ugzb2ybCiJW_1Rvu0",
    authDomain: "accugen-2d0dc.firebaseapp.com",
    projectId: "accugen-2d0dc",
    storageBucket: "accugen-2d0dc.firebasestorage.app",
    messagingSenderId: "786337540565",
    appId: "1:786337540565:web:4dababd653581398f5355c",
    measurementId: "G-GSBD286SCK"
  };
  

firebase.initializeApp(firebaseConfig);

export const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();
export const auth = app.auth();
export const storage = app.storage();

export default firebase;