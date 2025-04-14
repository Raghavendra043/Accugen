import firebase from '../firebase'
import { getUser } from './auth'
import 'firebase/compat/firestore';

import { getCountFromServer } from "firebase/firestore";

import { db } from '../firebase';


export const getData = async (Collectionref) => {
    try {
      var data = await Collectionref.get();
      var Data = [];
      data.forEach((element) => {
        Data.push({...element.data(), ...{"doc":element.id}});
      });
      return Data;
    } catch (error) {
      // console.log(error);
    }
};

export const getDBCount= async (collectionRef)=>{
    try{
        const d = await getData(collectionRef)
        return d.length;
    }catch(e){
        console.log(e)
    } 
}

export const getFabricDetails = async(types,category,  fabric = 0)=>{

    try{
        let Data = {}
        
        const coll  = category === "suit" ? "Suits" 
                    : category === "formal" || category === "pant" || category === "shirt" ? "formal"
                    : category === "kurta" ? "kurta" 
                    : category === "blazer" ? "blazer"
                    : category === "sadri" ? "kurta"
                    : "dummy" ;
        
        console.log("Getting fabrics for :", coll)

        const DOC  = db.collection('Fabric').doc(coll)

        for(let i = 0;i<types.length;i+=1){
            const collection = DOC.collection(types[i])
            const res = await getData(collection)
            Data[types[i]] = res
        }
        if(fabric === 1){
            
        }
        return Data
    }catch(e){
        // console.log("from getDetails-firestore ", e);
    }
}

export const getDatafromDoc = async (docref) => {
    try {
      var data = await docref.get();
      return data.data();
    } catch (error) {
      // console.log(error);
      return {"src":""}
    }
};

export const getDataFromCollection=async(Collection, typ=0)=>{
    try{
        if(typ === 0){

        }else{
            const user = getUser()

            if(user){
                // const email = user.email
                let usrid = user.email
                if(!usrid){
                    usrid = user.phoneNumber
                }
                const res = await db.collection("Users").doc(usrid).collection(Collection).get()

                return {
                    "status":true,
                    "res":res
                }
            }else{
                return {
                    "status":false,
                    "error":"User not found"
                }
            }
            
        }
    }catch(error){
        // console.log(error)
        return {
            "status":false,
            "error":"Error from DB" + error
        }
    }
}

export const getDocOnCondition = async(collection, attr, val)=>{
    try{
        const docs = await collection.where(attr, "==", val).get()
        let Docs = []
        docs.forEach((element) => {
          Docs.push(element.data())
        });
        return Docs
    }catch(e){
      // console.log("fetching doc names", e)
    }
  }