import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ResourceForm.css';

const ResourceForm = () => {
  const [fullName, setFullName] = useState('');
  const [resume, setResume] = useState(null);
  const [vendorName, setVendorName] = useState('');
  const [technologies, setTechnologies] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/vendors'); 
        setVendors(response.data); 
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };
    fetchVendors();
  }, []); 


  const handleTechnologyChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setTechnologies([...technologies, value]);
    } else {
      setTechnologies(technologies.filter((tech) => tech !== value));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('resume', resume);
    formData.append('vendorName', vendorName);
    formData.append('technologies', JSON.stringify(technologies));

    try {
      const response = await axios.post('http://localhost:8080/api/resources/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  
        },
      });
      setMessage(response.data.message);
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Error submitting form.');
    }
  };

  return (
    <div className="resource-form-container">
      <h2>Enter Resource Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter full name"
            required
          />
        </div>

        <div className="form-group">
          <label>Upload Resume</label>
          <input
            type="file"
            onChange={(e) => setResume(e.target.files[0])}
            required
          />
        </div>

        <div className="form-group">
          <label>Vendor Name</label>
          <select
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
            required
          >
            <option value="">Select Vendor</option>
            {vendors.length > 0 ? (
              vendors.map((vendor) => (
                <option key={vendor._id} value={vendor.name}>
                  {vendor.name}
                </option>
              ))
            ) : (
              <option value="" disabled>No vendors available</option>
            )}
          </select>
        </div>

        <div className="form-group">
          <label>Technology</label>
          <div className="checkbox-group">
            {['Node Js', 'PHP', 'React Js', 'TypeScript', 'Express JS'].map((tech) => (
              <div key={tech}>
                <input
                  type="checkbox"
                  value={tech}
                  onChange={handleTechnologyChange}
                />
                <label>{tech}</label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default ResourceForm;
