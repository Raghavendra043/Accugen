import './address.css'
import {
    GetCountries,
    GetState,
    GetCity,
    GetLanguages, //async functions
  } from "react-country-state-city";



function Address_ind({country, inpts, stateList, stateid, setStateid,cityList,cityid, setCityid, setCityList, setAddress, address_all}) {

    

    return ( <div className='add-address hori_center' >
        

        <div className='a-a-r-1 hori_center'>
            <div className='input-wrap1'>
                <div>Name <span style={{"color":"red"}}><b>*</b></span> </div> 
                <input className='a-a-i3' placeholder='Name' ref={inpts[0]}
            /></div>

            <div className='input-wrap1'>
                <div>Phone Number <span style={{"color":"red"}}><b>*</b></span> </div>
                
                <div style={{"position":"relative"}}>
                    <label className='p_code verti_center ' >+91 <b>-</b> </label>
                    <input className='a-a-i1 phone_n' placeholder='Phone Number' ref={inpts[1]}/>
                </div>
            </div>
        </div>
        <div className='a-a-r-1 hori_center'>
            <div className='input-wrap'>
                <div>House no. / Flat <span style={{"color":"red"}}><b>*</b></span> </div>
                <input className='a-a-i1' placeholder='Address 1' ref={inpts[2]}
            /></div>
        </div>
        <div className='a-a-r-1 hori_center'>
        <div className='input-wrap'>
                <div>Address <span style={{"color":"red"}}><b>*</b></span> </div>
                <input className='a-a-i2' placeholder='Address 2' ref={inpts[3]}
            /></div>
            </div>

        <div className='a-a-r-1 hori_center'>
            
            <div className='input-wrap'>
                <div>State <span style={{"color":"red"}}><b>*</b></span> </div>
                <select
                    className='a-a-i3'
                    onChange={(e) => {
                    
                    const state = stateList[e.target.value]; 
                    // console.log(state)
                    setStateid(state.id);
                    // console.log("State ", state.id) 

                    GetCity(country.id, state.id).then((result) => {
                        setCityList(result);
                    });
                    }}
                    
                    // value={stateid}
                >
                    {stateList.map((item, index) => (
                    <option key={index} value={index}>
                        {item.name}
                    </option>
                    ))}
                </select>
                    {/* <input className='a-a-i3' placeholder='Gender' ref={inpts[7]}/> */}
            </div>

            <div className='input-wrap s-c-dropdown'>
                <div>City <span style={{"color":"red"}}><b>*</b></span> </div>
                <select
                    className='a-a-i3'
                    onChange={(e) => {
                    const city = cityList[e.target.value]; 
                    
                    setCityid(city.id);
                    console.log("City, ", city.id)
                    }}
                    
                >
                    {cityList.map((item, index) => (
                    <option key={index} value={index}>
                        {item.name}
                    </option>
                    ))}
                </select>
                    {/* <input className='a-a-i3' placeholder='Gender' ref={inpts[7]}/> */}
            </div>
            

            
            

            <div className='input-wrap'>
                <div>Pincode <span style={{"color":"red"}}><b>*</b></span> </div>
                <input className='a-a-i3' placeholder='Pincode' ref={inpts[4]}
            /></div>
        </div>
        
        <h2 className='hori_center FIT_W'> Or </h2><br/>
        <h2 className='hori_center FIT_W'> Select from Saved Addresses </h2>
        <div className='address_list'>
                    
        {address_all && address_all.map((value, key)=>{
            return(
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value={key}
                        onChange={(e)=>{
                            // selectAddress(address[e.target.value])
                            setAddress( address_all[e.target.value] )
                            
                            // setData({...data,... {"address":address[e.target.value]}})
                            // console.log("checked :", e.target.value, address[e.target.value])
                        }}
                    />
                    <div class="form-check-label" for="exampleRadios1">
                        {value.name} | {value["address"]}, {value["state"]}, {value["city"]},{value["pincode"]}, {value["phone"]}
                    </div>
                </div>
            )
        })

        }
        </div>
        {/* { type === 0 && <div className='hori_center' style={{"width":"fit-content", "marginTop":"30px", "display":"flex"}}>
            <button className='Butt1' style={{"marginRight":"10px"}} 
                onClick={async()=>{
                    
                    if( !inpts[0].current.value 
                        || !inpts[1].current.value
                        || !inpts[2].current.value
                        || !inpts[3].current.value
                        || !cityid
                        || !stateid
                    ){
                        console.log("Enter all the details")
                        notify()
                    } else {
                        await addFunc(inpts, null,  true)
                    }
                
                }}
            ><span>Save address & Continue</span></button>
            <button className='Butt1'
                onClick={async ()=>{
                    if( !inpts[0].current.value 
                        || !inpts[1].current.value
                        || !inpts[2].current.value
                        || !inpts[3].current.value
                        || !inpts[4].current.value
                        || !inpts[5].current.value
                        || !cityid
                        || !stateid
                    ){
                        console.log("Enter all the details")
                        notify()
                    } else {
                        await addFunc(inpts, null, false)
                    }
                
                }}
            >
                <span>Proceed</span></button></div>} */}
        
    </div>  );
}

export default Address_ind;