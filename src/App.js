import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Motorcycle from './Pages/Motorcycle.js';
import SBS from './Pages/SBS.js';
import Accessoires from './Pages/Accessoires.js';
import Home from './Pages/Home.js';
import Navbar from './Components/Navbar.js';
import Footer from './Components/Footer.js';
import ContactUs from './Pages/ContactUs.js';
import './Styles/Navbar.css';


function App() {
  return (
   
   <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Motorcycle' element={<Motorcycle />} />
        <Route path='/SBS' element={<SBS />} />
        <Route path='/Accessoires' element={<Accessoires />} />
        <Route path="/ContactUs" element={<ContactUs />} />

        
      </Routes>
      <Footer />
    </Router>

  );
}

export default App;
