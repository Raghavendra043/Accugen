import { useContext, useState } from "react";
import Left_panel from "./left_panel";
import OrdersPage from "./orders";
import { AuthContext } from "../../Firebase/AuthProvider";
import { useParams } from "react-router-dom";

function Dashboard() {
    const {user} = useContext(AuthContext)
    const {type} = useParams()

    const [orders, setOrders] = useState()
    return ( 
    <div className="dashboard">
        <Left_panel
            user = {user}
            current = {type}
        />
        <div className="dashboard_content">
            <OrdersPage
                user={user}
                orders={orders}
                setOrders={setOrders}
            />
        </div>
        
    </div> );
}

export default Dashboard;