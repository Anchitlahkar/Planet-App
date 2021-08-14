import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCGY8vBu_IdMSDExhZHpbMglNRe1KR41FA",
  authDomain: "dreams-creation.firebaseapp.com",
  projectId: "dreams-creation",
  databaseURL: "https://dreams-creation-default-rtdb.firebaseio.com/",
  storageBucket: "dreams-creation.appspot.com",
  messagingSenderId: "291646997123",
  appId: "1:291646997123:web:f9ad92ae36a504a8c711b6",
  measurementId: "G-ZSK8X6PG2T",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase.firestore();
