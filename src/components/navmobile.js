import './login.css'

import logoDark from '../assets/images/logos/logo_dark.webp'
import acc from '../assets/images/social/acc.svg'
import close from '../assets/images/social/close.png'
import { useState } from 'react'

function Navnobile({user, setOpen}) {

    const items = [
        {
            attr:"Solutions", link:"/products/implant_solutions"
        },
        {
            attr:"Accugen Advantage", link:"/products/implant_solutions"
        },
        {
            attr:"MyAccugen", link:"/products/implant_solutions"
        },
        {
            attr:"Terms", link:"/"
        },
        
    ]

    return ( 
    <div className="nav_mobile">

        <img src={close} style={{"height":"30px", "width":"30px", position:"absolute", top:"10px", right:"10px"}}
            onClick={()=>{setOpen(false)}}
        />
        <img src={logoDark}/>
        <div className="nav_mob_items hori_center">
            {items.map((val, key)=>{
                return(
                    <div className="nav_mob_item">{val.attr}</div>
                )
            })

            }
        </div>

        <div className="nav_mob_bottom">
            <img src={acc} className=''/>
            <div>
                <label className='FIT_H verti_center'>
                    {user ? user.email : "Login"}
                </label>
            </div>
        </div>
    
    </div> );
}

export default Navnobile;