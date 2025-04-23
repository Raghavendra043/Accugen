import { useContext, useState } from 'react';
import './order_form.css'
import { AuthContext } from '../../Firebase/AuthProvider';
import { handleFireBaseUpload } from '../../Firebase/firestore';


function Order_form_1({formData, handleChange,  setState, setImages, error, setError, notify, images, setFormCheck, metadata}) {

    const {user} = useContext(AuthContext)

    
    
    const checkMandatoryFeilds = ()=>{
        setFormCheck(true)
        let a = true;
        const A = [];
        Object.keys(metadata).forEach((value)=>{
            if(metadata[value].r === 0 || metadata[value].type === "file" ){return;}
            if(!formData[value].length){
                a = a & false;
                A.push(value)
                console.log(value, formData)
            }  
        })
        A.forEach((e)=>{
            const a = document.getElementById(e)
            if(a){
                a.style.borderColor = "red";
            }
            
        })
        return a;
    }

    return ( 
        <div class="order_form_section order_form_case_details">
            <h2 class="order_form_2_title1 hori_center FIT_W">Implant Details</h2>

            <form onSubmit="" className="authpage_form">
                {
                    Object.keys(metadata).map((value, key)=>{
                        return(
                            <>
                                {((metadata[value].type === "text" || metadata[value].type === "number") 
                                && (!Object.hasOwn(metadata[value], "page"))) ? 
                                    <div class="order_form_input_group">
                                        <label for="clinic">{metadata[value].attr} {metadata[value].r === 1 && <span className='error'>*</span>} </label>
                                        <input
                                            type={metadata[value].type}
                                            name={value}
                                            
                                            value={formData[value]}
                                            onChange={handleChange}
                                            className="authpage_input"
                                            id = {value}
                                            required = {metadata[value].r === 1}
                                        />
                                    </div>
                                : metadata[value].type === "select" ? 
                                    <div class="order_form_input_group">
                                        <label for="clinic">{metadata[value].attr} {metadata[value].r === 1 && <span className='error'>*</span>} </label>
                                        <select className='order_form_dropdown' name={value}
                                            onChange={handleChange}
                                            id = {value}
                                        >
                                            {metadata[value].values.map((valls, key)=>{
                                                return(
                                                    <option value = {valls.replace(" ", "_")} selected={formData[value].replace(" ", "_") === valls.replace(" ", "_")} >{valls}</option>
                                                 )
                                            })
                                            }
                                            {/* <option value = "stock" >Stock</option>
                                            <option value = "multi_unit" >Multi-Unit Abutment</option>
                                            <option value = "custom" >Custom Abutment</option> */}
                                        </select>
                                    </div>
                                : metadata[value].type === "file" ? 
                                <div class="order_form_input_group">
                                    <label for="clinic">{metadata[value].attr} {metadata[value].r === 1 && <span className='error'>*</span>} </label>

                                    <div class="order_form_2_uploadArea" style={{marginBottom:"0"}}>
                                        <div class="order_form_2_uploadIcon">☁️</div>
                                        <p class="order_form_2_uploadText">Drag and drop files here</p>
                                        <p class="order_form_2_orText">or</p>
                                        <label class="order_form_2_browseButton" for="file-upload">
                                            Browse Files
                                            </label>
                                            <input type='file' style={{display:'none'}} id='file-upload' multiple
                                                onChange={(e) => {
                                                    console.log(e.target.files[0])
                                                    setImages((prev=>[...prev, e.target.files[0]]))
                                                }}
                                            />
                                    </div>
                                    {images && images.length >0 && <label>{images[0].name}</label>}
                                    <br/>
                                </div>
                                    
                                : <></>

                                }
                            </>
                        )
                    })
                }
                
                <div class="order_form_2_buttons">
                    <button class="order_form_2_backButton"
                        onClick={()=>{
                            setState(0);
                        }}

                    >Back</button>
                    <button class="order_form_button" 
                    type='button'
                    onClick={()=>{

                            if(checkMandatoryFeilds() && images){
                                
                                handleChange({target:{name:"implant_system_label", value:images[0].name}})
                                setState(2);
                                
                                console.log("from page 2", formData)
                            } else {
                                if(!images){
                                    notify("Upload Implant System label file")
                                }
                                notify()
                            }
                            
                        
                    }}
                    >Continue to File Upload</button>
                </div>

                {/* <div class="order_form_2_buttons">
        <button class="order_form_2_backButton"
            onClick={()=>{
                setState(0);
            }}

        >Back</button>
        <button class="order_form_2_continueButton"
            onClick={()=>{
                setState(1);
            }}
        >Continue</button>
        </div> */}

                
            </form>
            
            {error && <div className='error hori_center FIT_W '> {error}</div>}
                
        </div>
     );
}

export default Order_form_1;