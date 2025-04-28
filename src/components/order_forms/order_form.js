import { useNavigate, useParams } from 'react-router-dom';
import './order_form.css'
import { createRef, useContext, useEffect, useState } from 'react';
import { Sampledata } from '../../assets/data';
import Order_form_1 from './type1';
import Order_summary from './order_summary';
import { AuthContext } from '../../Firebase/AuthProvider';
import { addData, handleFireBaseUpload } from '../../Firebase/firestore';
import { db } from '../../firebase';
import { getData, getDBCount } from '../../Firebase/firestoreGet';
import { AddAddress, mailOrderTOCustomer } from '../../functions';
import Address_ind from '../checkout/address_ind';
import {
    GetState,
  } from "react-country-state-city";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import File_Upload from './file_upload';

function Order_form() {

    const {product} = useParams();

    const {user} = useContext(AuthContext)

    const [error, setError] = useState()

    const [orderId, setOrderId] = useState()

    const [state, setState] = useState(0)
    const navigate = useNavigate()

    const [item, setItem] = useState()

    const [load, setLoad] = useState(false)

    ////////////// address
    const [address, setAddress] = useState()
    const [address_all, setAddress_all] = useState()
    const [country, setCounty] = useState( {"c":"India","id":101} );
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [stateid, setStateid] = useState(0);
    const [cityid, setCityid] = useState(0);
    const [inpts, setInputs] = useState([createRef(""), createRef(""), createRef(""), createRef(""), createRef("")])
    
    useEffect(() => {
        GetState(country.id).then((result) => {
            setStateList(result);
        });
        setOrderID().then(()=>{
        })

        getData(db.collection('users').doc(user.email).collection('address')).then((res)=>{
            setAddress_all(res)
        })
        
    }, []);
    //////////
    const setOrderID = async()=>{
        const col = db.collection('orders')
        const num = await getDBCount(col)
        console.log("step 1", num);
        const paddedNumber = num ? (num+1).toString().padStart(6, '0') : '000001';

        const date = new Date()
        const orderId = `AGN-${date.getDate()}${date.getMonth()}${date.getFullYear()}-${paddedNumber}`
        setOrderId(orderId)
    }

    useEffect(()=>{
        setItem(Sampledata.find(e=> e.code === product))
    }, [product])

    const [images, setImages] = useState([])

    const [files, setFiles] = useState()

    const [formCheck, setFormCheck] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        refId: "",
        email : user.email,
        file_type : "stl",
        upload_type : "file_upload",
        notes : "",
        files : [],

        case_type: "Upper Arch",
        implant_count : "",
        implant_brand : "",
        implant_system : "",
        implant_dimensions_height : "",
        implant_dimensions_diameter : "",
        implant_inter_distance : "",
        angulation_details : "",
        implant_system_label:"",
        abutment_type : "",
        additional_options : "",
        quantity : ""
    });

    const metadata = {
        name: {type:"text", r:0, attr : "Patient Name" , page : 0},
        refId: {type:"text", r:1, attr : "Reference Id (only for your reference)" , page : 0},
        case_type: {type:"select", r:1, attr : "Select Arch", values : [ "Upper Arch", "Lower Arch", "Both Arches"]},
        implant_count : {type:"number", r:1, attr : "Number of Implants"},
        implant_brand : {type:"text", r:1, attr:"Implant Brand"},
        implant_system : {type:"text", r:1, attr : "Implant System"},
        implant_dimensions_height : {type:"number", r:0, attr : "Implant Dimensions - Height (mm)"},
        implant_dimensions_diameter : {type:"number", r:0, attr : "Implant Dimensions - Diameter (mm)"},
        implant_inter_distance : {type:"number", r:0, attr : "Inter-Implant Distance (mm)"},
        angulation_details : {type:"text", r:0, attr : "Angulation Details"},
        implant_system_label:{type:"file", r:1, attr : "Implant System Label Image"},
        abutment_type: {type:"select", r:1, attr : "Select Type", values : ["Custom", "Stock"]
        additional_options : {type : "multiple", r:0, attr : "Additional Options"},
        quantity : {type : "number", r:0, attr : "Quantity", },
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormCheck(false)
    };

    const submitOrder = async ()=>{

        setLoad(true)
        const col = db.collection('orders')
        // images, files
        const finalFiles = [...images]
        const ref = `${user.email}/${orderId}`
        const url = await handleFireBaseUpload(finalFiles[0].name, finalFiles[0], ref)
        formData.files.push({
            name:finalFiles[0].name,
            src:url
        }
        )
        
        formData["id"] = orderId
        
        formData["created"] = (new Date()).toDateString()
        formData["status"] ={
            status:0,
            note:""
        }
        
        formData["product"] = product


        await addData(col, orderId, formData)
        setLoad(false)

        mailOrderTOCustomer({...formData}).then(()=>{})
        AddAddress(user.email, address).then(()=>{})
        console.log(formData)
        setState(4)
    }

    const notify = (message = "Please Enter all the Details") => toast.error(message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
    });
    return ( 

        <div>
            <div>
                    {/* <button onClick={notify}>Notify!</button> */}
                    <ToastContainer
                        position="bottom-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
            </div>
            {(load) && (<div className='f-loading'>
                    <img alt src="https://d1fufvy4xao6k9.cloudfront.net/images/garment/loading.gif" onerror="this.src='https://d1fufvy4xao6k9.cloudfront.net/images/garment/loading.gif'" style={{transform:"scale(0.6)"}}/>
            </div>)}
            <div className='order_form_title hori_center'>
                <h1> {item?.title} </h1>
                <p>  {item?.tag}  </p>
            </div>
            <div class="order_form_container">
                {state!=4 && <div class="order_form_progress">
                <div class={ state ===0 ? "order_form_step order_form_step_active" :"order_form_step"}>
                    <div class="order_form_step_circle">1</div>
                    <span>Case Details & <br/> File Upload</span>
                </div>
                <div class={ state ===1 ? "order_form_step order_form_step_active" : "order_form_step" }>
                    <div class="order_form_step_circle">2</div>
                    <span>Implant Details</span>
                </div>
                <div class={ state ===2 ? "order_form_step order_form_step_active" : "order_form_step"}>
                    <div class="order_form_step_circle">3</div>
                    <span>Select Address</span>
                </div>
                <div class={ state ===3 ? "order_form_step order_form_step_active" : "order_form_step"}>
                    <div class="order_form_step_circle">4</div>
                    <span>Review & Submit</span>
                </div>
                </div>}

                {state ===0 && 
                <File_Upload
                    setState = {setState}
                    setFiles = {setFiles}
                    files = {files}
                    metadata ={metadata}
                    formData={formData}
                    handleChange={handleChange}
                    user = {user}
                    setFormData = {setFormData}
                    notify = {notify}
                    orderId={orderId}
                />
                }

                {/* /// */}

                {state ===1 && 
                    <Order_form_1
                    setState={setState}
                    formData={formData} 
                    handleChange={handleChange}  
                    setImages={setImages}
                    error = {error}
                    setError = {setError}
                    notify={notify}
                    images = {images}
                    setFormCheck = {setFormCheck}
                    metadata ={metadata}
                />
                }   

                {/* /// */}

                {state === 2 && 
                    <div class="order_form_2_section">
                <h2 class="order_form_2_title1 FIT_W hori_center">Select Address</h2>
                        <Address_ind 
                            country ={country}
                            inpts = {inpts}
                            stateList = {stateList}
                            stateid = {stateid} 
                            setStateid = {setStateid}
                            cityList = {cityList} 
                            cityid={cityid}
                            setCityid = {setCityid} 
                            setCityList = {setCityList}
                            setAddress = {setAddress}
                            address_all = {address_all}
                        />
                        <div class="order_form_2_buttons">
                <button class="order_form_2_backButton"
                    onClick={()=>{
                        
                        setState(1);
                    }}
    
                >Back</button>
                <button class="order_form_2_continueButton"
                    onClick={()=>{
                        if( !inpts[0].current.value 
                            || !inpts[1].current.value
                            || !inpts[2].current.value
                            || !inpts[3].current.value
                            || !inpts[4].current.value
                            || !cityid
                            || !stateid
                        ){
                            console.log("Enter all the details")
                            notify()
                        } else {
                            const Adds = {
                                "name":inpts[0].current.value,
                                "phone":inpts[1].current.value,
                                "address":inpts[2].current.value +" , " + inpts[3].current.value,
                                "state": stateList.find(o => o.id === stateid) ? stateList.find(o => o.id === stateid)["name"] : " ",
                                "city": cityList.find(o => o.id === cityid) ? cityList.find(o => o.id === cityid)["name"] : " ",
                                "pincode":inpts[4].current.value
                            } 
                            setAddress(Adds)
                            setState(3);
                        }
                        
                    }}
                >Continue to Review</button>
                </div>
                        </div>
                }


                {state ===3 && 
                    <Order_summary
                        setState = {setState}
                        data = {formData}
                        handleChange = {handleChange}
                        submitOrder = {submitOrder}
                        address = {address}
                        metadata ={metadata}
                    />
                }
                {
                    state ===4 && 
                    <div className='order_done'>
                        {/* <img /> */}
                        <div className='FIT_W hori_center'>   <svg class="checkmark" style={{margin:"0"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>
                        </div>
                        <h2>Order Placed</h2>
                        <br/>
                        <div>Thank you for placing the order. You will receive a order confirmation to your email address shortly</div>
                        <br/>
                        <div> Order ID : {formData.id}</div>
                        <div>Email : { formData.email}</div>
                        <br/>
                        <button
                            onClick={()=>{navigate(`/MyACCUGEN/order/${formData.id}`)}}
                        >View Order Details</button>
                    </div>
                }
            </div>
        </div>
     );
}

export default Order_form;
