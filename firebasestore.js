import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "",//use your own firebase data 
  authDomain: "",//use your own firebase data 
  projectId: "",//use your own firebase data 
  storageBucket: "",//use your own firebase data 
  messagingSenderId: "",//use your own firebase data 
  appId: ""//use your own firebase data 
};
const app = initializeApp(firebaseConfig);
const db=getFirestore(app)
export {db};