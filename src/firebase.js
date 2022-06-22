// Firebase configuration goes here

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBxzHuNx0cGm23YSikl-mhgP66AW9S5TaQ",
    authDomain: "note-it-app-11186.firebaseapp.com",
    databaseURL: "https://note-it-app-11186-default-rtdb.firebaseio.com",
    projectId: "note-it-app-11186",
    storageBucket: "note-it-app-11186.appspot.com",
    messagingSenderId: "257248304114",
    appId: "1:257248304114:web:fe9927d53325b45991a96b"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;

