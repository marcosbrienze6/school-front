import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
import UsersList from "./components/UsersList";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </Router>
  );
}

export default App;
