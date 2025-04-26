import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const RegisterPage=()=>{
    const [name, setName]=useState("")
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [confirmPassword, setConfirmPassword]=useState("")
    const [error, setError]=useState("")
    const navigate=useNavigate()

    const handleRegister=async(e)=>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:5000/api/users/register',{
                name,
                email,
                password,
                confirmPassword
            })
            navigate('/login')
        }catch(err){
            setError("Failed to register. Try again!")
        }
    }

    return(
        <div>
            <h2>Sign up</h2>
            <br/>
            {error && <p>{error}</p>}
            <br/>
            <form onSubmit={handleRegister}>
                <input
                name='name'
                placeholder="Your name"
                type="text"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
                />
                <br/>
                <input
                name="email"
                placeholder="Your email"
                type="email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                />
                <br />
                <input
                name="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                />
                <br />
                <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                />
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default RegisterPage;