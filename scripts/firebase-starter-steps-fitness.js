
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAXfjgWDUyvxARifEK8Lg_lWKinOVRrzPQ",
    authDomain: "starter-steps-fitness.firebaseapp.com",
    databaseURL: "https://starter-steps-fitness.firebaseio.com",
    projectId: "starter-steps-fitness",
    storageBucket: "starter-steps-fitness.appspot.com",
    messagingSenderId: "924925976765",
    appId: "1:924925976765:web:2decbbf78093955c0ad7d4"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
