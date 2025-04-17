import React, { use, useEffect, useState } from "react";
import "./profile.css";
import { FunnelIcon, PlusIcon, PencilIcon, EyeIcon, TrashIcon } from "lucide-react";
import { getData, getDocOnCondition } from "../../Firebase/firestoreGet";
import { db } from "../../firebase";
import { Sampledata, caseStatus, orderStatusMetadata } from "../../assets/data";
import { useNavigate } from "react-router-dom";


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




export default function OrdersPage({orders, setOrders, user, orderId}) {

  const [Order, setOrder] = useState()
  const navigate = useNavigate()

  useEffect(()=>{
    if(orderId && orders){
      setOrder(orders.find((val)=>val.id === orderId))
    }
  }, [orderId, orders])
  
  return (
    <div className="profile_container">
      <div className="profile_header">
        <h1 className="profile_title">Orders</h1>
        {orderId && <h2>Order - {orderId}</h2>}


        {!orderId && <div className="profile_controls">
          {/* <input
            type="text"
            placeholder="Search orders..."
            className="profile_search"
          />
          <button className="profile_filter">
            <FunnelIcon className="profile_icon" /> All Status
          </button> */}
          <button className="profile_neworder"
            onClick={()=>{navigate("/products/implant_solutions")}}
          >
            <PlusIcon className="profile_icon" /> New Order
          </button>
        </div>}
      </div>
      {(!orderId && orders && orders.length) && <>
      

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
              <tr key={order.id}
                onClick={()=>{
                  navigate(`/MyACCUGEN/orders/${order.id}`)
                }}
              >
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
      </>}

      {(orderId && Order) &&
        <div className="Order_detailed_view">
          <table className="profile_table">
            {Object.keys(Order).map((value, index)=>{
              return(
                <tr>
                  <td style={{width:"30%"}}>{value.replaceAll("_", " ")[0].toUpperCase() + value.replaceAll("_", " ").slice(1)}</td>
                  <td>
                    { 
                      value === "status" ? 
                        <span className={`profile_status`} style={{backgroundColor:orderStatusMetadata[caseStatus[Order.status.status]].bg, color:orderStatusMetadata[caseStatus[Order.status.status]].color}}>
                          {orderStatusMetadata[caseStatus[Order.status.status]].attr}
                        </span> 
                         : !Array.isArray(Order[value]) ? Order[value] 
                         : "" }
                  </td>
              </tr>)
            })}
          </table>
          <h2>Attachments</h2>
          <div className="order_detail_attachment">
            {Order.files.map((value)=>{
              return(
              <div className="order_detail_attachment_item" >
                <label>{value.name}</label>                
                <a href={value.src}><label>view/download</label></a>
              </div>)
            })
            }
          </div>
        </div>  

      }
    </div>
  );
}
