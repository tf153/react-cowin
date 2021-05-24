import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyDua11OnWMmTD6B_O1dKbHbAyfzYMHgeko",
    authDomain: "co-win-bd8d4.firebaseapp.com",
    projectId: "co-win-bd8d4",
    storageBucket: "co-win-bd8d4.appspot.com",
    messagingSenderId: "315825590418",
    appId: "1:315825590418:web:cb1cd3ee4800a46790564b",
    measurementId: "G-D3LP2L9754"
};
const firebaseApp=firebase.initializeApp(firebaseConfig);
const database=firebaseApp.firestore();

export default database;