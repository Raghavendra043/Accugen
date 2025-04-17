import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AccountConfirmation, approveAccount, verifyKey } from "./functions";

import './App.css'
import { addData } from "./Firebase/firestore";
import { db } from "./firebase";
import { CopyMinus } from "lucide-react";

function ApproveAccount() {

    const {data} = useParams()
    const [details, setDetails] = useState()
    const pass = useRef()
    const navigate = useNavigate()
    

    const [message, setMessage] = useState("Validating Request..")

    const [load, setLoad] = useState(true)

    useEffect(()=>{
        if(!data){
            navigate("/")
        }
        else {
            const acc = JSON.parse( atob(data) ) 
            setDetails(acc)
            createAccount(acc).then((data)=>{

            })
        }
    }, [data])

    const createAccount = async(data)=>{
        try {
            const coll = db.collection("users")
            const role = (data.email === "gagan47.c@gmail.com" || data.email === "raghavendra074743@gmail.com") ? "admin" : "user"
            setMessage("Account Creating...")
            
            const resp = await approveAccount(data.email, data.password, data.name)
            console.log(Object.keys(resp))
            let v = 1;
            if(resp.status === 200){
                setMessage("Confirming Account...")
            } else {
                if(resp.response.data.message === "Account with the email already exists"){
                    setLoad(false)
                    setMessage()
                    v = 0;          
                } else {
                    setLoad(false)
                    setMessage("Oops, Request Failed. Please try again after sometime")
                    v = 0;
                }
            }
            if(v){    
                await addData(coll, data.email, {...data, ...{role}})
                setMessage("Sending Confirmation email to user...")
                await AccountConfirmation(data.email, data.name)
                setMessage()
            }

            setLoad(false)
            return true
        } catch(e){
            console.log(e)
            return false
        }
    }

    return ( 
    <div className="approve_account hori_center">
        {(load) && 
        (<div className='f-loading1'>
            <div className="FIT_H FIT_W hori_center">
            <img alt src="https://d1fufvy4xao6k9.cloudfront.net/images/garment/loading.gif" onerror="this.src='https://d1fufvy4xao6k9.cloudfront.net/images/garment/loading.gif'" style={{transform:"scale(0.6)"}}/>
            <div> {message} </div>
            </div>
        </div>
        )}

        {
            (!load && details) && 
            (<div className='order_done'>
                {/* <img /> */}
                {!message && <div className='FIT_W hori_center'>   <svg class="checkmark" style={{margin:"0"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
                </div>}
                {!message && <h2>Account Creation Success</h2>}
                <br/>
                {!message && <div>User will be sent a email informing the confirmation of the account</div>}
                <br/>
                {message && <div> {message} </div>}
                <ul>
                    <li> Name : {details.name}</li>
                    <li>Email : {details.email}</li>
                    <li>Phone : {details.phone}</li>
                    <li> {details.organizationType} name : {details.organizationName} </li>
                </ul>
                <br/>
            </div>)
        }
        

    </div> );
}

export default ApproveAccount;