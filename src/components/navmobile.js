import './login.css'

function Navnobile({user}) {

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

        <div className="nav_mob_items">
            {items.map((val, key)=>{
                return(
                    <div className="nav_mob_item">{val.attr}</div>
                )
            })

            }
        </div>

        <div className="nav_mob_bottom">
            Login
        </div>
    
    </div> );
}

export default Navnobile;