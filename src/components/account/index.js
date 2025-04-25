import { useContext, useEffect, useState } from "react";
import Left_panel from "./left_panel";
import OrdersPage from "./orders";
import { AuthContext } from "../../Firebase/AuthProvider";
import { useParams } from "react-router-dom";
import Account_dash from "./account_dash";
import { db } from "../../firebase";
import { getData, getDocOnCondition } from "../../Firebase/firestoreGet";
import AccountSection from "./account";
import Modal_profile from "./Modal_profile";

function Dashboard() {
    const {user} = useContext(AuthContext)
    const {type} = useParams()
    const {orderId} = useParams()

    const [modal, setModal] = useState(false)

    const [orders, setOrders] = useState()
    useEffect(()=>{
        if(user){
          const coll = db.collection('orders')

          if(!["gagan47.c@gmail.com", "raghavendra074743@gmail.com", "admin@accugendental.com", "orders@accugendental.com"].includes(user.email)){
            getDocOnCondition(coll, "email", user.email).then((data)=>{
              console.log(data)
              setOrders(data)
            }).catch((e)=>{
              console.log(e)
            })
          } else {
            getData(coll).then((data)=>{
              console.log(data)
              setOrders(data)
            }).catch((e)=>{
              console.log(e)
            })
          }
          
          
        }
    }, [user])

    return ( 
    <div className="dashboard">
        <Left_panel
            user = {user}
            current = {type}
        />
        
        <div className="dashboard_content">
            {(modal && orders) && <Modal_profile modal = {modal} setModal = {setModal} order = {orders[0]}/>}

            {(type && type.includes("orders") ) ? <OrdersPage
                    user={user}
                    orders={orders}
                    setOrders={setOrders}
                    orderId = {orderId}
                />
                : type && type.includes("account") ? 
                  <AccountSection/>
                :
                <Account_dash orders={orders} user = {user}/>

            }
        </div>
        
    </div> );
}

export default Dashboard;