import { useParams } from 'react-router-dom';
import './order_form.css'
import { useEffect, useState } from 'react';
import { Sampledata } from './assets/data';

function Order_form() {

    const {product} = useParams();

    const [state, setState] = useState(0)

    const [item, setItem] = useState()

    useEffect(()=>{
        setItem(Sampledata.find(e=> e.code === product))
    }, [product])

    return ( 

        <div>
            <div className='order_form_title hori_center'>
                <h1> {item?.title} </h1>
                <p>  {item?.tag}  </p>
            </div>
            <div class="order_form_container">
                <div class="order_form_progress">
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
                </div>

                {state ===0 && <div class="order_form_section order_form_case_details">
                <div class="order_form_title">Case Information</div>
                <div class="order_form_input_group">
                    <label for="clinic">Clinic/Lab Name</label>
                    <input type="text" id="clinic" placeholder="Enter your clinic or lab name" />
                </div>
                <div class="order_form_input_group">
                    <label for="patient">Patient Name or Case ID</label>
                    <input type="text" id="patient" placeholder="Enter patient name or case ID" />
                </div>
                <div class="order_form_input_group">
                    <label for="product">Product Type</label>
                    <select id="product">
                    <option value="">Select from our available digital dental products</option>
                    </select>
                </div>
                <div class="order_form_input_group">
                    <label for="units">Number of Units</label>
                    <input type="number" id="units" value="1" />
                </div>
                <div class="order_form_input_group">
                    <label for="shade">Shade / Material</label>
                    <input type="text" id="shade" placeholder="E.g., A2 / Zirconia" />
                </div>
                <div class="order_form_button_group "
                    
                >
                    <button class="order_form_button hori_center" 
                    onClick={()=>{
                        setState(1);
                    }}
                    >Continue to File Upload</button>
                </div>
                </div>}

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
                    <input type='file' style={{display:'none'}} id='file-upload'/>
                </div>

                <div class="order_form_2_uploadedFile">
                <div class="order_form_2_fileIcon">📄</div>
                <div class="order_form_2_fileDetails">
                    <span class="order_form_2_fileName">STOCK ITER 1.stl</span>
                    <span class="order_form_2_fileSize">0.6 MB</span>
                </div>
                <div class="order_form_2_fileStatus">Uploaded</div>
                <button class="order_form_2_deleteFile">❌</button>
                </div>

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
            <div class="order_form_3_card">
                <h2 class="order_form_3_title">Review & Submit</h2>

                <div class="order_form_3_order_summary">
                <h3 class="order_form_3_section_title">Order Summary</h3>
                <div class="order_form_3_summary_item">
                    <span class="order_form_3_label">Clinic/Lab:</span>
                    <span class="order_form_3_value">-</span>
                </div>
                <div class="order_form_3_summary_item">
                    <span class="order_form_3_label">Patient/Case ID:</span>
                    <span class="order_form_3_value">-</span>
                </div>
                <div class="order_form_3_summary_item">
                    <span class="order_form_3_label">Product Type:</span>
                    <span class="order_form_3_value">Unknown</span>
                </div>
                <div class="order_form_3_summary_item">
                    <span class="order_form_3_label">Units:</span>
                    <span class="order_form_3_value">1</span>
                </div>
                <div class="order_form_3_summary_item">
                    <span class="order_form_3_label">Shade/Material:</span>
                    <span class="order_form_3_value">-</span>
                </div>
                <div class="order_form_3_summary_item">
                    <span class="order_form_3_label">Files:</span>
                    <span class="order_form_3_value">STOCK ITER 1.stl (0.6 MB)</span>
                </div>
                </div>

                <div class="order_form_3_textarea_container">
                <textarea class="order_form_3_textarea" placeholder="Add any specific instructions or requirements"></textarea>
                <div class="order_form_3_textarea_footer">
                    <span class="order_form_3_counter">0/500</span>
                </div>
                </div>

                <div class="order_form_3_buttons">
                <button class="order_form_3_back_button"
                    onClick={()=>{
                        setState(1);
                    }}
                >Back</button>
                <button class="order_form_3_submit_button">Submit Order ✓</button>
                </div>
            </div>

            
                }
            </div>
        </div>
     );
}

export default Order_form;