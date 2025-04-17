import { useContext, useEffect, useState } from "react";
import Left_panel from "./left_panel";
import OrdersPage from "./orders";
import { AuthContext } from "../../Firebase/AuthProvider";
import { useParams } from "react-router-dom";
import Account_dash from "./account_dash";
import { db } from "../../firebase";
import { getDocOnCondition } from "../../Firebase/firestoreGet";

function Dashboard() {
    const {user} = useContext(AuthContext)
    const {type} = useParams()

    const [orders, setOrders] = useState()
    useEffect(()=>{
        if(user){
          const coll = db.collection('orders')
          getDocOnCondition(coll, "email", user.email).then((data)=>{
            console.log(data)
            setOrders(data)
          }).catch((e)=>{
            console.log(e)
          })
        }
    }, [user])

    return ( 
    <div className="dashboard">
        <Left_panel
            user = {user}
            current = {type}
        />
        
        <div className="dashboard_content">
            {(type && type.includes("orders") ) ? <OrdersPage
                    user={user}
                    orders={orders}
                    setOrders={setOrders}
                />
                :  <Account_dash orders={orders} user = {user}/>

            }
        </div>
        
    </div> );
}

export default Dashboard;