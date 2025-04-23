function Order_summary({data, setState, handleChange, submitOrder, address, metadata}) {
    
    return ( 
        <div class="order_form_3_card">
        <h2 class="order_form_3_title">Review & Submit</h2>

        <div class="order_form_3_order_summary">
        <h3 class="order_form_3_section_title">Order Summary</h3>

        {data && Object.keys(data).map((value, key)=>{
            return(
                <>{
                    value !="notes" &&
                
                
                    <div class="order_form_3_summary_item">
                        <span class="order_form_3_label">{metadata[value] ? metadata[value].attr : value.replaceAll("_", " ")}</span>
                        <span class="order_form_3_value">{data[value]}</span>
                    </div>
                    }
                </>
            )
        })}
        <br/>
        <h3 class="order_form_3_section_title">Address</h3>
        {["phone", "name", "address", "state", "city", "pincode"].map((vals, ks)=>{
            return(<div class="order_form_3_summary_item">
                <span class="order_form_3_label">{vals[0].toUpperCase() + vals.slice(1)}</span>
                <span class="order_form_3_value">{address[vals]}</span>
            </div>)
        })

        }
    
        
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
                setState(2);
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