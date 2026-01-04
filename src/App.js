import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Motorcycle from "./Pages/Motorcycle.js";
import SBS from "./Pages/SBS.js";
import Accessoires from "./Pages/Accessoires.js";
import Home from "./Pages/Home.js";
import Navbar from "./Components/Navbar.js";
import Footer from "./Components/Footer.js";
import ContactUs from "./Pages/ContactUs.js";
import Login from "./Pages/Login.js";
import Signup from "./Pages/Signup.js";
import AdminProducts from "./Pages/AdminProducts.js";
import AdminMessages from "./Pages/AdminMessages";
import SearchResults from "./Pages/SearchResults";


import "./Styles/Navbar.css";

import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Motorcycle" element={<Motorcycle />} />
          <Route path="/SBS" element={<SBS />} />
          <Route path="/Accessoires" element={<Accessoires />} />
          <Route path="/ContactUs" element={<ContactUs />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={<SearchResults />} />

        <Route
            path="/admin"
             element={
           <ProtectedRoute requireAdmin={true}>
           <AdminProducts />
        </ProtectedRoute>
            }
                />

            <Route
  path="/admin/messages"
  element={
    <ProtectedRoute requireAdmin={true}>
      <AdminMessages />
    </ProtectedRoute>
  }
/>

        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
