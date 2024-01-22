import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBhAj1hXFJAkRadhcbmySjgXUaZGCAKFRo",
    authDomain: "aaaa-4de74.firebaseapp.com",
    projectId: "aaaa-4de74",
    storageBucket: "aaaa-4de74.appspot.com",
    messagingSenderId: "806794517947",
    appId: "1:806794517947:web:1db72b74bbd4710d67389e",
    measurementId: "G-P4QFGLRS8D"
};
let app;
let analytics;
// Initialize Firebase
if(typeof window!=='undefined'){
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);}
export default app