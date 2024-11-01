import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
  } from "firebase/auth";
  import { addDoc, collection, getFirestore } from "firebase/firestore";
  import { toast } from "react-toastify";
  const firebaseConfig = {

    apiKey: "AIzaSyBCpLxQXmTAG05zCcOcnVNVfGMhrGOYVkA",

    authDomain: "netflix-clone-f4a5c.firebaseapp.com",
  
    projectId: "netflix-clone-f4a5c",
  
    storageBucket: "netflix-clone-f4a5c.firebasestorage.app",
  
    messagingSenderId: "871416474755",
  
    appId: "1:871416474755:web:ec5bd12a9cedf6af6d7fb6"
  
  
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
