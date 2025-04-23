import { useContext, useState } from 'react';
import './order_form.css'
import { AuthContext } from '../../Firebase/AuthProvider';
import { handleFireBaseUpload } from '../../Firebase/firestore';


function Order_form_1({formData, handleChange,  setState, setImages, error, setError, notify, images}) {

    const {user} = useContext(AuthContext)

    const metadata = {
        name: {type:"text", r:0, attr : "Patient Name"},
        refId: {type:"text", r:1, attr : "Reference Id (only for your reference)"},
        case_type: {type:"select", r:1, attr : "Case Type", values : [ "Upper Arch", "Lower Arch", "Both Arches"]},

        implant_count : {type:"number", r:1, attr : "Number of Implants"},
        implant_brand : {type:"text", r:1, attr:"Implant Brand"},
        implant_system : {type:"text", r:1, attr : "Implant System"},
        implant_dimensions : {type:"text", r:1, attr : "Implant Dimensions"},
        implant_inter_distance : {type:"number", r:1, attr : "Inter-Implant Distance (mm)"},
        angulation_details : {type:"text", r:0, attr : "Angulation Details"},
        implant_system_label:{type:"file", r:1, attr : "Implant System Label Image"},

        gingival_clearance : {type:"text", r:0, attr : "Gingival Clearance (mm)"},
        occlusal_clearence : {type:"text", r:0, attr : "Occlusal Clearance (mm)"},
        abutment_type : {type:"select", r:1, attr : "Abutment Type", values:["Stock", "Multi-Unit Abutment", "Custom Abutment"]},

        additional_options : {type : "multiple", r:0, attr : "", },
    }
    
    const checkMandatoryFeilds = ()=>{
        let a = true;
        Object.keys(metadata).forEach((value)=>{
            if(!a || metadata[value].r === 0 || metadata[value].type === "file" ){return;}
            if(!formData[value].length){
                a = a & false;
                console.log(value, formData)
            }  
        })
        return a;
    }

    return ( 
        <div class="order_form_section order_form_case_details">
            <form onSubmit="" className="authpage_form">
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
                
                
                {
                    Object.keys(metadata).map((value, key)=>{
                        return(
                            <>
                                {(metadata[value].type === "text" || metadata[value].type === "number") ? 
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
                                <label class="order_form_2_browseButton FIT_W" for="file-upload">
                                    Browse Files
                                    </label>
                                    {images && images.length && <label>{images[0].name}</label>}
                                    <input type='file' style={{display:'none'}} id='file-upload' multiple
                                    onChange={(e) => {
                                        console.log(e.target.files[0])
                                        setImages((prev=>[...prev, e.target.files[0]]))
                                    }}
                                    />
                                    <br/>
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

                            if(checkMandatoryFeilds()){
                                if(formData["email"] && !formData["email"].length){
                                    handleChange({target:{name:"email", value:user.email}})
                                }
                                handleChange({target:{name:"implant_system_label", value:images[0].name}})
                                setState(1);
                                
                                console.log(formData)
                            } else {
                                notify()
                            }
                            
                        
                    }}
                    >Continue to File Upload</button>
                </div>

                
            </form>
            
            {error && <div className='error hori_center FIT_W '> {error}</div>}
                
        </div>
     );
}

export default Order_form_1;