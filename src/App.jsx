import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import UserPage from "./pages/UserPage";
import UserRolePage from "./pages/UserRolePage";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password-reset" element={<ResetPassword />} />
          <Route path="/role/:roleId" element={<UserRolePage />} />
          <Route path="/user/:userId" element={<UserPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
