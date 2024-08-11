// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeoANE_J9NQZ3Zu9fvgUp_n29HH3Rv-po",
  authDomain: "inventory-management-2edfc.firebaseapp.com",
  projectId: "inventory-management-2edfc",
  storageBucket: "inventory-management-2edfc.appspot.com",
  messagingSenderId: "811666352898",
  appId: "1:811666352898:web:15970c1d30b2852732b01b",
  measurementId: "G-3JBVTRSC19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore}