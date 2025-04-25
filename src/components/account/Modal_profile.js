
import {caseStatus, orderStatusMetadata} from '../../assets/data'
function Modal_profile({modal, setModal, order}) {

    
    return ( 
        <div className='modal_container'>
    <div className="modal_profile hori_center">
        <h3 className="FIT_W hori_center">{order.id}</h3>

        <div className="modal_des">
            <div>Status : {order.status.status}</div>
            <div>Update Status</div>
            <select>
                {
                    Object.keys(orderStatusMetadata).map((val, key)=>{
                        return(
                            <option>{orderStatusMetadata[val].attr}</option>
                        )
                    })
                }
                
            </select>
        </div>
        
    </div>
    </div> );
}

export default Modal_profile;