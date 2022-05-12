import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
import {collection, getDocs} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyAqdsayt9opH9foXEtbWbGpEt7hjdnGjYM",
  authDomain: "pizzeria-saeta.firebaseapp.com",
  projectId: "pizzeria-saeta",
  storageBucket: "pizzeria-saeta.appspot.com",
  messagingSenderId: "182186711253",
  appId: "1:182186711253:web:af28ed9d4cf2f864966a5c",
  measurementId: "G-C0SR2F8N21"
};

// Initialize Firebase
const DB = initializeApp(firebaseConfig);

const fbstore = getFirestore(DB);

export const APICALLER = {


  get : async({table})=>{
    
    let data = await getDocs(collection(fbstore,table));
    let response = data.docs.map((doc)=>({...doc.data(),id:doc.id}))
    return  response;
  }

}