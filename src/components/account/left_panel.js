function Left_panel({user, current}) {
    
    const elements =[
        {
            "attr" : "Orders",
            "link" : "/profile/orders"
        },
        {
            "attr" : "Account",
            "link" : "/profile/account"
        },
        {
            "attr" : "Logout",
            "link" : "/profile/logout"
        },
    ]
    return ( 
    <div className="profile_left_panel">
        {user && <div className="profile_left_panel_account FIT_W hori_center">
            <div className="profile_round hori_center">
                <label className="">{user.email[0]}</label>
            </div>
            <div >
                {user.email}
            </div>
        </div>}

        {elements.map((val, key)=>{
            return(
            <div className={`left_panel_item ${current === val.attr.toLowerCase() ? "left_panel_item_active" : ""}`}
                type="button"
            >
                {val.attr}
            </div>)
        })

        }
    </div> );
}

export default Left_panel;