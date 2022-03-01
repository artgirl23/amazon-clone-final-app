import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyB8JcwYcPgKvUYCs4SQ-oiR_dXO9SgA7hc",
  authDomain: "challenge-1d412.firebaseapp.com",
  projectId: "challenge-1d412",
  storageBucket: "challenge-1d412.appspot.com",
  messagingSenderId: "1013019730141",
  appId: "1:1013019730141:web:7bc12a37f6688fcf23bb34",
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };