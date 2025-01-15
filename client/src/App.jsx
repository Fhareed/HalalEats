import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from "./pages/RegisterPage"; // Adjust the path if needed
import Homepage from "./pages/HomePage"; // Adjust path for your Homepage if applicable
import LoginPage from "./pages/loginPage"; 
import ButcherListPage from "./pages/ButcherListPage"; 

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the homepage */}
        <Route path="/" element={<Homepage />} />

        {/* Route for the register page */}
        <Route path="/register" element={<RegisterPage />} />


        <Route path="/login" element={<LoginPage />} />

        {/* Route for the butcher list page */}
        <Route path="/butchers" element={<ButcherListPage />} />

        
      </Routes>
    </Router>
  );
};

export default App;