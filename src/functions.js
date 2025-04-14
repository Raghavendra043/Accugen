import { db } from "./firebase"
import { addData } from "./Firebase/firestore"
import { getDBCount } from "./Firebase/firestoreGet"
import axios from "axios";



const backendURL = "https://accugen-backend-r76f.vercel.app";

// export const postOrder = async(setLoad, setState, Data, user)=>{
//     try{
//         let formData = {...Data}

//         setLoad(true)
//         // images, files
//         const col = db.collection('orders')
//         const num = await getDBCount(col)
//         console.log(num)
//         const paddedNumber = num ? num.toString().padStart(6, '0') : '000001';

//         const date = new Date()
//         const orderId = `AGN-${date.getDate()}${date.getMonth()}${date.getFullYear()}-${paddedNumber}`
//         const finalFiles = [...images, ...files]
        
//         const urls = [];
//         // for(let i=0;i<finalFiles.length;i++){
//         //     const ref = `${user.email}/${orderId}`
//         //     const url = await handleFireBaseUpload(finalFiles[i].name, finalFiles[i], ref)
//         //     formData.files.push(url)
//         // }
//         formData["id"] = orderId
//         formData["email"] = user.email
//         formData["created"] = (new Date()).toDateString()
        
        
//         formData["product"] = product


//         await addData(col, orderId, formData)

//         const params = {
//             orderId : orderId,
//             email : user.email,
//             product : product,
//             name : user.displayName
//         }
//         sendOrderEmail(params).then((res)=>{
//             console.log(res)
//         }).catch((e)=>{
//             console.log(e)
//         })
//         setLoad(false)
//         console.log(formData)
//         setState(3)
//     } catch(e){
//         console.log(e)
//     }
// }
const sendOrderEmail =async(data)=>{
    

    const res = await axios.post(`https://jsonplaceholder.typicode.com/users`, data)
    return res;
}

export const sendOTP = async(otp, email)=>{
    try{
        const data = {
            otp, email
        }
        const resp = await axios.post(`${backendURL}/sendOtp`, data);
        console.log(resp)
        return resp.data.status === 0
    }catch(e){
        console.log(e)
    }
}

export const sendToAdmin = async(data)=>{
    try{
        const resp = await axios.post(`${backendURL}/sendToAdmin`, data);
        console.log(resp)
        return resp
    }catch(e){
        console.log(e)
    }
}

export const approveAccount = async(email, pass, name)=>{
    try{
        const resp = await axios.post(`${backendURL}/customToken`, {email, password:pass,name});
        console.log(resp)
        return resp
    }catch(e){
        console.log(e)
    }
}

export const verifyKey = async(key)=>{
    try{
        const resp = await axios.post(`${backendURL}/verifyPass`, {key});
        console.log(resp)
        return resp.status === 200
    }catch(e){
        console.log(e)
    }
}

export const mailOrderTOCustomer = async(data)=>{
    try{
        const resp = await axios.post(`${backendURL}/sendMail`, data);
        console.log(resp)
        return resp.status === 200
    }catch(e){
        console.log(e)
    }
}

