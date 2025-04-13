function Order_summary({data, setState, handleChange, submitOrder}) {
    return ( 
        <div class="order_form_3_card">
        <h2 class="order_form_3_title">Review & Submit</h2>

        <div class="order_form_3_order_summary">
        <h3 class="order_form_3_section_title">Order Summary</h3>

        {data && Object.keys(data).map((value, key)=>{
            return(
                <div class="order_form_3_summary_item">
                    <span class="order_form_3_label">{value}</span>
                    <span class="order_form_3_value">{data[value]}</span>
                </div>
            )
        })}

        
        {/* <div class="order_form_3_summary_item">
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
        </div> */}
        </div>

        <div class="order_form_3_textarea_container">
        <textarea class="order_form_3_textarea" placeholder="Add any specific instructions or requirements"
            maxLength="500"
            value={data.notes}
            name="notes"
            onChange={(e)=>{
                handleChange(e)
            }}
        >

        </textarea>
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
        <button class="order_form_3_submit_button"
            onClick={async()=>{
                await submitOrder();
            }}
        >Submit Order ✓</button>
        </div>
    </div> );
}

export default Order_summary;