import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Firebase/AuthProvider";

function Left_panel({user, current}) {
    
    const navigate = useNavigate()
    const {userSignOut} = useContext(AuthContext)

    const elements =[
        {
            "attr" : "Dashboard",
            "link" : "/MyACCUGEN"
        },
        {
            "attr" : "Orders",
            "link" : "/MyACCUGEN/orders"
        },
        {
            "attr" : "Account",
            "link" : "/MyACCUGEN/account"
        },
        {
            "attr" : "Logout"
        },
    ]
    return ( 
    <div className="profile_left_panel">
        {user && <div className="profile_left_panel_account FIT_W hori_center">
            <div className="profile_round hori_center">
                <label style = {{display:"block", margin:"0"}} className="FIT_H FIT_W both_center">{user.email[0].toUpperCase()}</label>
            </div>
            <div >
                {user.email}
            </div>
        </div>}

        {elements.map((val, key)=>{
            return(
            <div className={`left_panel_item ${((!current && val.attr ==="Dashboard") || current === val.attr.toLowerCase()) ? "left_panel_item_active" : ""}`}
                type="button"
                onClick={async()=>{
                    if(key === elements.length-1){
                        await userSignOut()
                    } else {
                        navigate(val.link)
                    }
                    
                }}
            >
                {val.attr}
            </div>)
        })

        }
    </div> );
}

export default Left_panel;