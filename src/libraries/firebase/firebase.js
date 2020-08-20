import firebase from "firebase";

// API credentials
var firebaseConfig = {
    apiKey: "AIzaSyBftoTf_YgGGCwFDHlNvFdtqX_tYTEUjTA",
    authDomain: "oneperday-1758a.firebaseapp.com",
    databaseURL: "https://oneperday-1758a.firebaseio.com",
    projectId: "oneperday-1758a",
    storageBucket: "oneperday-1758a.appspot.com",
    messagingSenderId: "424644558334",
    appId: "1:424644558334:web:9b9fe283d7503b38a314af"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// export const auth = firebase.auth();
export const fs = app.firestore();
export const auth = app.auth();
export const st = app.storage();
// export const an = firebase.analytics();

// export const st = app.storage();