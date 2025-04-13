import { useContext } from "react";
import { AuthContext } from "../Firebase/AuthProvider";

function Profile() {

    const {user, userSignOut} = useContext(AuthContext)
    
    return ( 
    <div className="profile" style={{marginTop:"50px", marginBottom:"30px", height:"70vh"}}>
        
        <div style={{textAlign:"center"}}>Your Orders</div>
        <div style={{textAlign:"center"}}>You currently have no orders</div>
        <button className="hori_center"
            onClick={async()=>{await userSignOut();}}
        >logout</button>
    </div> 
    );
}

export default Profile;