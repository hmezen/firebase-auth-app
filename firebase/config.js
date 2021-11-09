import firebase from "firebase/app";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfR7cLwO-vJsmnlcQvQMLh4IuNwYYTB2k",
  authDomain: "chat-app-56c35.firebaseapp.com",
  projectId: "chat-app-56c35",
  storageBucket: "chat-app-56c35.appspot.com",
  messagingSenderId: "454904509178",
  appId: "1:454904509178:web:bf7af0513ee509c65f0f43",
  measurementId: "G-526NT8RCCF",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
