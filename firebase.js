import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth/cordova";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyADFUBwxpx6yDwvKR_urqd-xDU9VAuWGRU",
  authDomain: "netflix-clone-4162b.firebaseapp.com",
  projectId: "netflix-clone-4162b",
  storageBucket: "netflix-clone-4162b.appspot.com",
  messagingSenderId: "394289583783",
  appId: "1:394289583783:web:c574503f3f988b862d2d82",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db= getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};
const login = async (email, password) => {;
try {
  await signInWithEmailAndPassword(auth,email,password);
} catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
}
}
const logout =()=>{
    signOut(auth);  
}
   export {auth,db,login,signup,logout};  
