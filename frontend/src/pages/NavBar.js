import React from "react";
import { Link } from "react-router-dom";
// import LoginPage from "./loginPage";
// import RegisterPage from "./RegisterPage";
// import PostsPage from "./PostsPage";

const Navbar=()=>{
    const handleLogout=()=>{
        localStorage.removeItem('token')
        window.location.href='/login'
    }

    return(
        <div>
            <Link to='/login'>Login</Link>
            <br/>
            <Link to='/register'>Register</Link>
            <br />
            <Link to='posts'>Posts</Link>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Navbar;