import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.init";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";


export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [data,setData]=useState();
  const [loading,setLoading]=useState(true);
  const provider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };
  //console.log(user);
  const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };
  const forgetpass=(email)=>{
    return sendPasswordResetEmail(auth, email)
  }
 
  const updateUser=(upData)=>{
    return updateProfile(auth.currentUser,upData);
  }

  //Obserber Set
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

   useEffect(() => {
    fetch("/data.json")
      .then(res => res.json() )
      .then(setData)
      .catch(err=>{
      //  console.log(err);
      })
  }, []);

  const globalInfo = {
    user,
    setUser,
    createUser,
    signIn,
    logOut,
    signInWithGoogle,
    forgetpass,
    data,
    loading,
    updateUser,
  };

  return <AuthContext value={globalInfo}>{children}</AuthContext>;
};
export default ContextProvider;
