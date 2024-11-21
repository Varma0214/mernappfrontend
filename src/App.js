import React from 'react';
import { Navigate,Routes, Route } from 'react-router-dom';
import VendorForm from './components/VendorForm';
import ResourceForm from './components/ResourceForm';
import Dashboard from './components/Dashboard';

const App = () => {
return (
  <div className="app">
    <Routes>
    
            <Route path="/" element={<Navigate to ="/vendorform"/>}/>
            <Route path="/vendorform" element={<VendorForm />}  />      
            <Route path="/resourceform" element={<ResourceForm />}  />      
            <Route path="/dashboard" element={<Dashboard />}  />      
                
    </Routes>
</div>
  
);
};

export default App;
