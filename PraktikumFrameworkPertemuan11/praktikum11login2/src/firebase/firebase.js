import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    //Your Config Values    
        apiKey: "AIzaSyBdgvIFz3Thh-NmRS0PccIP5afhvpG0J-M",
        authDomain: "praktikum11-14c89.firebaseapp.com",
        projectId: "praktikum11-14c89",
        storageBucket: "praktikum11-14c89.appspot.com",
        messagingSenderId: "402132181114",
        appId: "1:402132181114:web:a9f7e3049cc4e04bb45bc3",
        measurementId: "G-YFFL0BMJPV"      
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;