function File_Upload({files, setFiles, setState}) {
    return ( 
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
        >Continue</button>
        </div>
    </div>
    );
}

export default File_Upload;