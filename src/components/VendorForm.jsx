import React, { useState } from 'react';
import axios from 'axios';

function VendorForm() {
  const [vendorName, setVendorName] = useState({ name: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorName({ ...vendorName, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting data:", vendorName);  

      const response = await axios.post('http://localhost:8080/api/vendors/add', vendorName);
      setMessage(response.data.message); 
      setVendorName({ name: '' }); 
    } catch (err) {
      console.error('Error details:', err);
      setMessage(err.response ? err.response.data.error : 'Error submitting form.');
    }
  };

  return (
    <div className="container">
      <h1>Vendor Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            value={vendorName.name}
            type="text"
            name="name"
            placeholder="Enter Vendor Name"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default VendorForm;
