import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";

import { auth } from '../firebase';

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setRunning(false);
    });
    return () => {
      unSubscribe();
    };
  }, [user]);

  const createNewUser = (email, password) => {
    setRunning(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const UserLogin = (email, password) => {
    setRunning(true);
    const a = signInWithEmailAndPassword(auth, email, password);
    console.log(a)
    return a;
  };

  const userSignOut = () => {
    setRunning(true);
    return signOut(auth);
  };

  const loginWithGoogle = () => {
    setRunning(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signinWithToken = async(id, backendURL)=>{
    try{
        const headers = {
            "Content-Type" : "application/json"
        }
    
        const params ={
            "email" : id
        }
        const resp = await fetch(`${backendURL}/customToken`, { method: 'POST', headers:headers,body:JSON.stringify(params)});
        const data = await resp.json();

        const u=await auth
        .signInWithCustomToken(data.customToken) 

        // navigate(redirect)
    } catch(e){ 
        console.log(e)
    }
  }

  const contextData = {
    user,
    running,
    createNewUser,
    UserLogin,
    userSignOut,
    loginWithGoogle,
    signinWithToken
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
