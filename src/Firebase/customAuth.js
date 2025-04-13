import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
  } from "firebase/auth";
import { useEffect, useState } from "react";
import {auth} from '../firebase'

export function CustomAuth() {

    const [user, setUser] = useState(null);
    const [running, setRunning] = useState(true);
  
    const loginUser = (email, password) => {
      setRunning(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    const logOut = () => {
      setRunning(true);
      return signOut(auth);
    };
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setRunning(false);
      });
  
      return () => {
        unsubscribe();
      };
    }, []);
  
    const authValue = {
      user,
      loginUser,
      logOut,
      running,
    };

    return authValue
}