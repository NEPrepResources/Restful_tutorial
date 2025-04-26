import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/RegisterPage";
import PostsPage from "./pages/PostsPage";
import Navbar from "./pages/NavBar";

const App=()=>{
  return(
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/posts" element={<PostsPage/>}/>
      </Routes>
    </Router>
  )
}

export default App