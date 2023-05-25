// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const app = initializeApp ({
  apiKey: "AIzaSyC9AMtMUmDIh9AeeV-p_MRMlge_j7zRrPE",
  authDomain: "happy-children-6bac7.firebaseapp.com",
  projectId: "happy-children-6bac7",
  storageBucket: "happy-children-6bac7.appspot.com",
  messagingSenderId: "8253151341",
  appId: "1:8253151341:web:b2f28ae9665d218d400764",
  measurementId: "G-B7QLTYM0LQ"
});

// Initialize Firebase
const storage = getStorage(app);
export default storage;