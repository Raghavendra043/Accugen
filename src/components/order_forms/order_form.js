import { useNavigate, useParams } from 'react-router-dom';
import './order_form.css'
import { useContext, useEffect, useState } from 'react';
import { Sampledata } from '../../assets/data';
import Order_form_1 from './type1';
import Order_summary from './order_summary';
import { AuthContext } from '../../Firebase/AuthProvider';
import { addData, handleFireBaseUpload } from '../../Firebase/firestore';
import { db } from '../../firebase';
import { getDBCount } from '../../Firebase/firestoreGet';


function Order_form() {

    const {product} = useParams();

    const {user} = useContext(AuthContext)

    const [state, setState] = useState(0)
    const navigate = useNavigate()

    const [item, setItem] = useState()

    const [load, setLoad] = useState(false)

    useEffect(()=>{
        setItem(Sampledata.find(e=> e.code === product))
    }, [product])

    const [images, setImages] = useState([])

    const [files, setFiles] = useState()

    const [formData, setFormData] = useState({
        name: "",
        refId: "",
        email : "",
        case_type: "",

        implant_count : "",
        implant_brand : "",
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
        console.log(num)
        const paddedNumber = num ? num.toString().padStart(6, '0') : '000001';

        const date = new Date()
        const orderId = `AGN-${date.getDate()}${date.getMonth()}${date.getFullYear()}-${paddedNumber}`
        const finalFiles = [...images, ...files]
        
        const urls = [];
        // for(let i=0;i<finalFiles.length;i++){
        //     const ref = `${user.email}/${orderId}`
        //     const url = await handleFireBaseUpload(finalFiles[i].name, finalFiles[i], ref)
        //     formData.files.push(url)
        // }
        formData["id"] = orderId
        formData["email"] = user.email
        formData["created"] = (new Date()).toDateString()
        
        
        formData["product"] = product


        await addData(col, orderId, formData)
        setLoad(false)
        console.log(formData)
        setState(3)
    }

    return ( 

        <div>
            {load && (<div className='f-loading'>
                    <img alt src="https://d1fufvy4xao6k9.cloudfront.net/images/garment/loading.gif" onerror="this.src='https://d1fufvy4xao6k9.cloudfront.net/images/garment/loading.gif'" style={{transform:"scale(0.6)"}}/>
            </div>)}
            <div className='order_form_title hori_center'>
                <h1> {item?.title} </h1>
                <p>  {item?.tag}  </p>
            </div>
            <div class="order_form_container">
                {state!=3 && <div class="order_form_progress">
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
                    <span>Review & Submit</span>
                </div>
                </div>}

                {state ===0 && 
                <Order_form_1
                    setState={setState}
                    formData={formData} 
                    handleChange={handleChange}  
                    setImages={setImages}
                />}

                {/* /// */}

                {state ===1 && 
            <div class="order_form_2_section">
                <h2 class="order_form_2_title">Upload Files</h2>

                <div class="order_form_2_infoBox">
                <p class="order_form_2_infoText">
                    <strong>Please upload your STL and design files below.</strong><br />
                    Supported formats: STL, DCM, OBJ, PLY (Max size: 50MB per file)
                </p>
                </div>

                <div class="order_form_2_uploadArea">
                <div class="order_form_2_uploadIcon">☁️</div>
                <p class="order_form_2_uploadText">Drag and drop files here</p>
                <p class="order_form_2_orText">or</p>
                <label class="order_form_2_browseButton" for="file-upload">
                    Browse Files
                    </label>
                    <input type='file' style={{display:'none'}} id='file-upload' multiple
                        onChange={(e)=>{
                            setFiles(e.target.files)
                            console.log(e.target.files)
                        }}
                    />
                </div>

                {files && Array.from(files).map((val, key)=>{
                    return(
                    <div class="order_form_2_uploadedFile">
                        <div class="order_form_2_fileIcon">📄</div>
                        <div class="order_form_2_fileDetails">
                            <span class="order_form_2_fileName">{val.name}</span>
                            <span class="order_form_2_fileSize">0.6 MB</span>
                        </div>
                        <div class="order_form_2_fileStatus">Uploaded</div>
                        
                    </div>)
                })}

                <div class="order_form_2_buttons">
                <button class="order_form_2_backButton"
                    onClick={()=>{
                        setState(0);
                    }}
    
                >Back</button>
                <button class="order_form_2_continueButton"
                    onClick={()=>{
                        setState(2);
                    }}
                >Continue to Review</button>
                </div>
            </div>
                }

                {/* /// */}

                {state ===2 && 
                    <Order_summary
                        setState = {setState}
                        data = {formData}
                        handleChange = {handleChange}
                        submitOrder = {submitOrder}
                    />

            
                }
                {
                    state ===3 && 
                    <div className='order_done'>
                        {/* <img /> */}
                        <h2>Order Placed</h2>
                        <br/>
                        <div>Thank you for placing the order. You will receive a order confirmation to your email address shortly</div>
                        <br/>
                        <div> Order ID : {formData.id}</div>
                        <div>Email : {user.email}</div>
                        <br/>
                        <button
                            onClick={()=>{navigate("/MyACCUGEN")}}
                        >View Order Details</button>
                    </div>
                }
            </div>
        </div>
     );
}

export default Order_form;