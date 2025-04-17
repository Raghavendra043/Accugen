function Stats_card({item}) {
    return ( 
    <div className="stats_card">
        
        <div className="status_card_left"></div>
        <div className="status_card_right">
            <label>{item.attr}</label>
            <label className="stats_value">{item.value}</label>
        </div>
    </div> );
}

export default Stats_card;