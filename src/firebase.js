import firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD1beNRIk8pXk1Rmk4HlqsfLBwOo4I2SSk",
  authDomain: "food-diary-56e30.firebaseapp.com",
  databaseURL: "https://food-diary-56e30.firebaseio.com",
  projectId: "food-diary-56e30",
  storageBucket: "food-diary-56e30.appspot.com",
  messagingSenderId: "1031744399559"
};
firebase.initializeApp(config);

export default firebase;
