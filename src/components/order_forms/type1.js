import { useContext, useState } from 'react';
import './order_form.css'
import { AuthContext } from '../../Firebase/AuthProvider';
import { handleFireBaseUpload } from '../../Firebase/firestore';


function Order_form_1({formData, handleChange,  setState, setImages, error, setError}) {

    const {user} = useContext(AuthContext)

    const metadata = {
        name: {type:"text", r:0},
        refId: {type:"text", r:1},
        case_type: {type:"text", r:1},

        implant_count : {type:"number", r:1},
        implant_brand : {type:"text", r:1},
        implant_dimensions : {type:"text", r:1},
        implant_inter_distance : {type:"number", r:1},
        angulation_details : {type:"text", r:0},
        implant_system_label:{type:"file", r:1},

        gingival_clearance : {type:"text", r:0},
        occlusal_clearence : {type:"text", r:0},
        abutment_type : {type:"select", r:1},

        additional_options : {type : "multiple", r:0},
    }
    
    const checkMandatoryFeilds = ()=>{
        Object.keys(metadata).forEach((value)=>{
            if(metadata[value].r && !formData[value].length){
                setError("Fill the Required fields")
                return false
            }  
            console.log(formData[value].length)
        })
        return true;
    }

    return ( 
        <div class="order_form_section order_form_case_details">
            <form onSubmit="" className="authpage_form">
                <div>Email : {user?.email}</div>

                {
                    Object.keys(metadata).map((value, key)=>{
                        return(
                            <>
                                {(metadata[value].type === "text" || metadata[value].type === "number") ? 
                                    <div class="order_form_input_group">
                                        <label for="clinic">{value} {metadata[value].r === 1 && <span className='error'>*</span>} </label>
                                        <input
                                            type="text"
                                            name={value}
                                            placeholder= {value}
                                            value={formData[value]}
                                            onChange={handleChange}
                                            className="authpage_input"
                                            required = {metadata[value].r === 1}
                                        />
                                    </div>
                                : metadata[value].type === "select" ? 
                                    <div class="order_form_input_group">
                                        <label for="clinic">{value} {metadata[value].r === 1 && <span className='error'>*</span>} </label>
                                        <select className='order_form_dropdown'>
                                            <option value = "stock" >Stock</option>
                                            <option value = "multi_unit" >Multi-Unit Abutment</option>
                                            <option value = "custom" >Custom Abutment</option>
                                        </select>
                                    </div>
                                : metadata[value].type === "file" ? 
                                <div class="order_form_input_group">
                                    <label for="clinic">{value} {metadata[value].r === 1 && <span className='error'>*</span>} </label>
                                <label class="order_form_2_browseButton FIT_W" for="file-upload">
                                    Browse Files
                                    </label>
                                    <input type='file' style={{display:'none'}} id='file-upload' multiple
                                    onChange={(e) => {
                                        console.log(e.target.files[0])
                                        

                                        setImages((prev=>[...prev, e.target.files[0]]))
                                    }}
                                    />
                                </div>
                                    
                                : <></>

                                }
                            </>
                        )
                    })
                }
                
                <div class="order_form_button_group"
                    
                >
                    <button class="order_form_button hori_center" 
                    type='button'
                    onClick={()=>{
                        
                            setState(1);
                            console.log(formData)
                        
                    }}
                    >Continue to File Upload</button>
                </div>

                
            </form>
            <br/>
            {error && <div className='error hori_center FIT_W '> {error}</div>}
                
        </div>
     );
}

export default Order_form_1;