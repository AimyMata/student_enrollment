// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAr22-19BBJfprVN4gqzgkEJlg4Iph2f4M",
  authDomain: "studentacad-30601.firebaseapp.com",
  projectId: "studentacad-30601",
  storageBucket: "studentacad-30601.appspot.com",
  messagingSenderId: "411689709427",
  appId: "1:411689709427:web:84992fd9b43d7675e11f06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };