import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { approveAccount, verifyKey } from "./functions";

import './App.css'

function ApproveAccount() {

    const {data} = useParams()
    const [details, setDetails] = useState()
    const pass = useRef()
    const navigate = useNavigate()
    const ref = useRef()

    const [vrfy, setVerify] = useState(false)

    const [error, setError] = useState()

    useEffect(()=>{
        if(!data){
            navigate("/")
        }
        else {
            setDetails(JSON.parse( atob(data) ))
        }
    }, [data])

    return ( 
    <div className="approve_account hori_center">
        {details && 
            (<><ul>
            <li> Name : {details.name} </li>
            <li> Email : {details.email} </li>
            <li> Phone : {details.phone} </li>
            <li> {details.organizationType} name : {details.organizationName} </li>
        </ul>
        {!vrfy &&<><input ref={pass} placeholder="pass key" /> 
        <button onClick={async()=>{
            const a = await verifyKey(pass.current.value)
            if(a){
                setVerify(true)
            } else {
                setVerify(false)
                setError("Wrong key")
            }

        }}>
            Verify Key
        </button></>}
        <p></p>
        <br/>
        <button
        disabled={!vrfy}
            onClick={async()=>{
                if(vrfy){
                    const resp = await approveAccount(details.email, details.password, details.name)
                    if(resp.status === 200){
                        setError("Success")
                    }
                } else {
                    setError("Wrong pass key")
                }
                
            }}
        >Approve Account</button>
        {error && <div style={{color:"red"}}>{error}</div>}
        </>)
        }
        

    </div> );
}

export default ApproveAccount;