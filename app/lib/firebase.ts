import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA4NdhXfp1fsaO6mLd2DPR6G_Chmnj80xw",
  authDomain: "taskboardapp-ee288.firebaseapp.com",
  projectId: "taskboardapp-ee288",
  storageBucket: "taskboardapp-ee288.appspot.com", // ✅ fixed
  messagingSenderId: "472405043344",
  appId: "1:472405043344:web:70375163034859aa09d015"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
