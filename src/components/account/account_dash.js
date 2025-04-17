import { useEffect, useState } from "react";
import Stats_card from "./stats_card";
import OrdersPage from "./orders";

function Account_dash({orders, user}) {

    const [stats, setStats] = useState()
    useEffect(( )=>{
        if(orders && orders.length){
            let s = [];
            
            const action = orders.filter((e)=>e.status.status === 3).length
            const completed = orders.filter((e)=>e.status.status === -1).length
            const active = orders.filter((e)=>e.status.status != -1).length
            
            
            s.push({"attr":"Total cases", "value":orders.length})
            s.push({"attr":"Active Cases", "value":active})
            s.push({"attr":"Cases completed", "value":completed})
            s.push({"attr":"Action Required", "value":action})
            console.log(s)
            setStats(s)
        }
    }, [orders])
    return ( 
    <div>
        <h1 className="profile_title">Dashboard</h1>
        <div className="stats_cards_dashboard">
        {stats && stats.length && stats.map((order, key)=>{
            return(<Stats_card item = {order}/>)
        })

        }
        </div>
        <OrdersPage
            user={user}
            orders={orders}
        />

    </div> );
}

export default Account_dash;