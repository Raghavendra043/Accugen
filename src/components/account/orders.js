import React, { useEffect } from "react";
import "./profile.css";
import { FunnelIcon, PlusIcon, PencilIcon, EyeIcon, TrashIcon } from "lucide-react";
import { getData, getDocOnCondition } from "../../Firebase/firestoreGet";
import { db } from "../../firebase";
import { Sampledata, caseStatus, orderStatusMetadata } from "../../assets/data";


// const orders = [
//   {
//     id: "ORD-1001",
//     client: "Smith Dental",
//     type: "Titanium Bar",
//     units: 2,
//     status: "Milling",
//     planned: "Yes",
//     date: "13/04/2025"
//   },
//   {
//     id: "ORD-998",
//     client: "City Clinic",
//     type: "Zirconia Crown",
//     units: 5,
//     status: "CAD",
//     planned: "Yes",
//     date: "13/04/2025"
//   },
//   {
//     id: "ORD-985",
//     client: "Harbor Lab",
//     type: "Zirconia Bridge",
//     units: 1,
//     status: "Post-processing",
//     planned: "Yes",
//     date: "13/04/2025"
//   },
//   {
//     id: "ORD-975",
//     client: "Bayside Clinic",
//     type: "Zirconia Crown",
//     units: 3,
//     status: "Not yet started",
//     planned: "No",
//     date: "13/04/2025"
//   },
//   {
//     id: "ORD-965",
//     client: "Lakeside Dental",
//     type: "Titanium Bridge",
//     units: 1,
//     status: "Completed",
//     planned: "Yes",
//     date: "13/04/2025"
//   }
// ];




export default function OrdersPage({orders, setOrders, user}) {

  useEffect(()=>{

  }, [])
  
  return (
    <div className="profile_container">
      <div className="profile_header">
        <h1 className="profile_title">Orders</h1>
        {/* <div className="profile_controls">
          <input
            type="text"
            placeholder="Search orders..."
            className="profile_search"
          />
          <button className="profile_filter">
            <FunnelIcon className="profile_icon" /> All Status
          </button>
          <button className="profile_neworder">
            <PlusIcon className="profile_icon" /> New Order
          </button>
        </div> */}
      </div>
      {(orders && orders.length) ? <>
      

      <div className="profile_table_wrapper">
        <table className="profile_table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Type</th>
              <th>Units</th>
              <th>Status</th>
              {/* <th>Planned</th> */}
              <th>Date</th>
              
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{ Sampledata.find((val)=>val.code === order.product)["title"] }</td>
                <td>{ Sampledata.find((val)=>val.code === order.product)["type"] === 1 ? "Implant Solution" : "Tooth Supported"}</td>
                <td>{order.implant_count && order.implant_count.length ? order.implant_count : 1}</td>
                <td>
                  <span className={`profile_status`} style={{backgroundColor:orderStatusMetadata[caseStatus[order.status.status]].bg, color:orderStatusMetadata[caseStatus[order.status.status]].color}}>
                    {orderStatusMetadata[caseStatus[order.status.status]].attr}
                  </span>
                </td>
                {/* <td>{order.planned}</td> */}
                <td>{order.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </> : (<>No Orders yet</>)}
    </div>
  );
}
