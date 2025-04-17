import { useNavigate, useParams } from 'react-router-dom';
import './order_form.css'
import { createRef, useContext, useEffect, useState } from 'react';
import { Sampledata } from '../../assets/data';
import Order_form_1 from './type1';
import Order_summary from './order_summary';
import { AuthContext } from '../../Firebase/AuthProvider';
import { addData, handleFireBaseUpload } from '../../Firebase/firestore';
import { db } from '../../firebase';
import { getDBCount } from '../../Firebase/firestoreGet';
import { mailOrderTOCustomer } from '../../functions';
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

    const [state, setState] = useState(0)
    const navigate = useNavigate()

    const [item, setItem] = useState()

    const [load, setLoad] = useState(false)

    ////////////// address
    const [address, setAddress] = useState()
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
    }, []);
    //////////

    useEffect(()=>{
        setItem(Sampledata.find(e=> e.code === product))
    }, [product])

    const [images, setImages] = useState([])

    const [files, setFiles] = useState()

    const [formData, setFormData] = useState({
        name: "",
        refId: "",
        email : "",
        case_type: "Upper_Arch",

        implant_count : "",
        implant_brand : "",
        implant_system : "",
        implant_dimensions : "",
        implant_inter_distance : "",
        angulation_details : "",
        implant_system_label:"",

        gingival_clearance : "",
        occlusal_clearence : "",
        abutment_type : "",

        additional_options : [],

        notes : "",

        files : []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const submitOrder = async ()=>{

        setLoad(true)
        // images, files
        const col = db.collection('orders')
        const num = await getDBCount(col)
        console.log("step 1", num);
        const paddedNumber = num ? (num+1).toString().padStart(6, '0') : '000001';

        const date = new Date()
        const orderId = `AGN-${date.getDate()}${date.getMonth()}${date.getFullYear()}-${paddedNumber}`
        const finalFiles = [...images, ...Array.from(files)]
        
        const urls = [];
        for(let i=0;i<finalFiles.length;i++){
            if(finalFiles[i]){
                const ref = `${user.email}/${orderId}`
                const url = await handleFireBaseUpload(finalFiles[i].name, finalFiles[i], ref)
                formData.files.push(url)
            }
        }
        console.log("file uplod done", num);
        formData["id"] = orderId
        
        formData["created"] = (new Date()).toDateString()
        formData["status"] ={
            status:0,
            note:""
        }
        
        formData["product"] = product


        await addData(col, orderId, formData)
        console.log("Db done", num);
        setLoad(false)

        mailOrderTOCustomer({...formData}).then(()=>{})

        console.log(formData)
        setState(4)
    }

    const notify = () => toast.error("Please Enter all the Details", {
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
                    <span>Case Details</span>
                </div>
                <div class={ state ===1 ? "order_form_step order_form_step_active" : "order_form_step" }>
                    <div class="order_form_step_circle">2</div>
                    <span>File Upload</span>
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
                <Order_form_1
                    setState={setState}
                    formData={formData} 
                    handleChange={handleChange}  
                    setImages={setImages}
                    error = {error}
                    setError = {setError}
                    notify={notify}
                    images = {images}
                />}

                {/* /// */}

                {state ===1 && 
                    <File_Upload
                        setState = {setState}
                        setFiles = {setFiles}
                        files = {files}
                    />
                }   

                {/* /// */}

                {state === 2 && 
                    <div class="order_form_2_section">
                <h2 class="order_form_2_title">Upload Files</h2>
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
                        <div>Email : {user.email}</div>
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