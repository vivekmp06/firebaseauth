// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4sJUadRrdRNbW2Rg9k75vgTrF5hskCsE",
  authDomain: "rich-brother.firebaseapp.com",
  projectId: "rich-brother",
  storageBucket: "rich-brother.appspot.com",
  messagingSenderId: "718374822626",
  appId: "1:718374822626:web:2ca81acf287bda1ab7b4bb",
  measurementId: "G-DGJ4JCSJPB"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
// const analytics = getAnalytics(app);