import firebase, { storage } from '../firebase'
import { getUser } from './auth'

const db = firebase.firestore()

export const addData = async (collection, doc, Data) => {
    try {
      if (Data && collection) {
        if (doc && doc.length > 0) {
          
          await collection.set(Data);
        } else {
          await collection.add(Data);
        }
      }
      return true;
    } catch (error) {
      console.log(error);
    }
};

export const handleFireBaseUpload = async(name, imgFile, ref) => {  
  // console.log('start of upload')
  // console.log(name)
  const uploadTask = await storage.ref(`/${ref}/${name}`).put(imgFile)
  var imagePathRef = storage.ref(`/${ref}/`).child(name);  
  const url = await imagePathRef.getDownloadURL();
  // console.log(url)
  return url
}

