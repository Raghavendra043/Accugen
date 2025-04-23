import { useState } from "react";
import { handleFireBaseUpload } from "../../Firebase/firestore";

function File_Upload({files, setFiles, setState, user, formData, handleChange, orderId, setFormData, notify}) {

    const [uploadLoad, setUploadLoad] = useState({id:0, s:true})
    const uploadToStorage=async(files)=>{
        const urls = [];
        const finalFiles = [...Array.from(files)]
        for(let i=0;i<finalFiles.length;i++){
            if(files[i]){
                const ref = `${user.email}/${orderId}`
                const url = await handleFireBaseUpload(finalFiles[i].name, finalFiles[i], ref)
                formData.files.push({
                    name:finalFiles[i].name,
                    src:url
                }
                )
                console.log(url)
            }
            setUploadLoad({id:i+1, s:true})
        }
        setFormData(formData)
    }
    return ( 
        <div class="order_form_2_section">
        <h2 class="order_form_2_title1 hori_center FIT_W">Case Details</h2>

        {(user.email === "gagan47.c@gmail.com" || user.email === "raghavendra074743@gmail.com") ? 
                    <div class="order_form_input_group">
                    <label for="clinic"> Email (leave the blank empty for default email)</label>
                    <input
                        type="text"
                        name={"email"}
                        placeholder={`${user.email}`}
                        value={formData["email"]}
                        onChange={handleChange}
                        className="authpage_input"
                    />
                </div>
                : <><div>Email : {user?.email}</div><br/></>
        }
        <div class="order_form_input_group">
            <label for="clinic">Patient Name </label>
            <input
                type= "text"
                name="name"
                
                value={formData["name"]}
                onChange={handleChange}
                className="authpage_input"
                id = {"name"}
            />
        </div>
        <div class="order_form_input_group">
            <label for="clinic">Reference ID (for your reference only) <span className='error'>*</span></label>
            <input
                type={"text"}
                name={"refId"}
                
                value={formData["refId"]}
                onChange={handleChange}
                className="authpage_input"
                id = {"refId"}
                required = {true}
            />
        </div>

        <div class="order_form_2_title hori_center">
            <div className={formData["upload_type"] === "file_upload" ? "active_order_form_tirle" : ''}
                onClick={()=>{handleChange({target:{name:"upload_type", value:"file_upload"}})}}
            >File Upload</div>
            <div className={formData["upload_type"] === "shipping" ? "active_order_form_tirle" : ''}
                onClick={()=>{handleChange({target:{name:"upload_type", value:"shipping"}})}}
            >Ship Models</div>
        </div>
        {formData["upload_type"] === "file_upload" ? <div>
        <div className="radio_group FIT_W hori_center">
            <input type="radio" id="contactChoice1" name="file_type" value="stl" checked ={formData.file_type === "stl"}
                onChange={(e)=>{ 
                    handleChange({target:{name:"file_type", value:e.target.value}})
                }}
            />
            <label for="stl"
                onClick={()=>{handleChange({target:{name:"file_type", value:"stl"}})}}
            >Designed STL File</label>

            <input type="radio" id="design_service" name="file_type" value="design_service" checked ={formData.file_type === "design_service"}
                onChange={(e)=>{ 
                    handleChange({target:{name:"file_type", value:e.target.value}})
                }}
            />
            <label for="design_service"
                onClick={()=>{handleChange({target:{name:"file_type", value:"design_service"}})}}
            >Design Service required</label>
        </div>

        
            <div class="order_form_2_infoBox">  
            <p class="order_form_2_infoText">
                {
                    formData["file_type"] === "stl" ? 
                    <>
                        <strong>Please upload your Designed files below.</strong><br />
                    </>
                    : 
                    <div className="order_form_2_infoText hori_center">
                        <div>Please upload the following scans to avail of our design service:</div>
                        <ul>
                        <li>Upper and lower arch scans (with scan markers)</li>
                        <li>Pre‑op/provisional scan</li>
                        <li>Bite registration/jaw relation scan</li>
                        </ul>
                    </div>
                }
                
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
                        uploadToStorage(e.target.files)
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
                    <div class="order_form_2_fileStatus">
                        { 
                            uploadLoad.id === key && uploadLoad.s ? "Uploading..."
                            : uploadLoad.id > key ? "Uploaded" 
                            : "Pending.."
                        }
                    </div>
                    
                </div>)
            })}
        </div>
        
        : (
        <div className="order_form_page1_shipping hori_center">
            <h3>Please send the models to our shipping address at:</h3><br/>

            <b>Accugen – Digital Dental Solutions</b> <br/>
            3rd Floor, Plot No. 4R & 5R, Rajiv Gandhi Nagar, Sai Nagar, <br/>
            Kukatpally, Hyderabad, Telangana 500037 <br/>
            <b>Phone: +91 70754 88757</b>
        </div>)}

        <div class="order_form_2_buttons">
        <button class="order_form_2_continueButton"
            disabled ={formData["email"].length > 0 && formData["refId"].length > 0 &&
                ( (files && uploadLoad.id === Array.from(files).length && uploadLoad.id>0) || formData["upload_type"] === "shipping") ? false : true}
            style={
                formData["email"].length > 0 && formData["refId"].length > 0 &&
                    ( (files && uploadLoad.id === Array.from(files).length && uploadLoad.id>0) || formData["upload_type"] === "shipping")
                ?  {} : {color:"black", backgroundColor:"#d9d9d9", opacity:"0.5"}
            }
            onClick={()=>{
                if(formData["email"].length > 0 && formData["refId"].length > 0 &&
                    ( (files && uploadLoad.id === Array.from(files).length && uploadLoad.id>0) || formData["upload_type"] === "shipping")
                ){
                    console.log("From page 1", formData)
                    setState(1);
                } else {
                    notify()
                }
                
            }}
        >Continue</button>
        </div>
    </div>
    );
}

export default File_Upload;