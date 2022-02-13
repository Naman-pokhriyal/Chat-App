// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBu2qyFq9lzWiWJdhyPKiC1NHdtmIyhlKM",
  authDomain: "forus-og.firebaseapp.com",
  databaseURL:
    "https://forus-og-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "forus-og",
  storageBucket: "forus-og.appspot.com",
  messagingSenderId: "557070152090",
  appId: "1:557070152090:web:fa7b2ed8642576113d4a23",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const db = firebase.database();

export { auth, db };
