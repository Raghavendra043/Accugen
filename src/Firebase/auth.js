// import { getAuth, signInWithEmailAndPassword , setPersistence } from "firebase/auth";
import firebase from '../firebase'


export const signin = async(email, password)=>{
    try{
        
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        const user = await firebase.auth().signInWithEmailAndPassword(email, password)
        // console.log(user.user)

        return user.user
    }catch(err){
        // console.log("in firebase signin", err)
        return {"error":err}
    }
}

export const signinGoogle = async()=>{
    try{
        var provider = new firebase.auth.GoogleAuthProvider()
        provider.addScope('https://www.googleapis.com/auth/userinfo.email');
        provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

        const res = await firebase.auth().signInWithPopup(provider)
        // console.log("Logged in with Google ", res.user)

    }catch(error){
        // console.log("from firebase function", error)
    }
}
export const logout=async()=>{
    try{
        await firebase.auth().signOut();
    }catch(err){
        // console.log(err)
    }
}

export const getState = ()=>{
    const user = firebase.auth().currentUser;
    // console.log(user)
    if(user){
        return true
    }
    return false
}

export const getUser= async()=>{
    const user = await firebase.auth().currentUser;
    // console.log("from funtion", user)
    if(user){
        return user
    }else{
        return false;
    }
}

export const signup = async()=>{
    
}

