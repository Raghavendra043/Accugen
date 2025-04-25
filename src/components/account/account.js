import React, { useState } from 'react';
import './acc.css';  // Import the CSS file

const AccountSection = ({user}) => {
  const [addresses, setAddresses] = useState([
    { id: 1, address: '' },
  ]);

  const handleAddressChange = (id, value) => {
    setAddresses(prev => prev.map(addr => addr.id === id ? { ...addr, address: value } : addr));
  };

  const addAddress = () => {
    const newId = addresses.length ? addresses[addresses.length - 1].id + 1 : 1;
    setAddresses([...addresses, { id: newId, address: '' }]);
  };

  return (
    <div className="account_info_container">
      <h2 className="account_info_heading">Account Information</h2>

      <div className="account_info_group">
        <label className="account_info_label">Contact Name</label>
        <input className="account_info_input" type="text" placeholder="Enter contact name" value={"Gagan"}/>
      </div>

      <div className="account_info_group">
        <label className="account_info_label">Lab / Clinic Name</label>
        <input className="account_info_input" type="text" placeholder="Enter lab/clinic name" />
      </div>

      <div className="account_info_group">
        <label className="account_info_label">Registered Email</label>
        <input className="account_info_input" type="email" placeholder="Enter registered email" />
      </div>

      <div className="account_info_group">
        <label className="account_info_label">Registered Phone Number</label>
        <input className="account_info_input" type="tel" placeholder="Enter registered phone" />
      </div>

      <div className="account_info_address_section">
        <h3 className="account_info_subheading">Address(es)</h3>
        {addresses.map((addr, index) => (
          <div key={addr.id} className="account_info_group">
            <label className="account_info_label">Address {index + 1}</label>
            <input
              className="account_info_input"
              type="text"
              value={addr.address}
              placeholder="Enter address"
              onChange={(e) => handleAddressChange(addr.id, e.target.value)}
            />
          </div>
        ))}
        <button className="account_info_add_btn" onClick={addAddress}>Add Another Address</button>
      </div>
    </div>
  );
};

export default AccountSection;
