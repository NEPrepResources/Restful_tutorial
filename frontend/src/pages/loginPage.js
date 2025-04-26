import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LoginPage=()=>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleLogin=async(e)=>{
        e.preventDefault()

        try{
            const response= await axios.post('http://localhost:5000/api/users/login',{
                email,
                password
            })
            localStorage.setItem("token", response.data.token)
            navigate('/posts')
        }catch(err){
            setError("Invalid Credentials. Please try again later!")
        }
    }

    return(
        <div>
            <h2>Login</h2>
            <br/>
            {error && <p>{error}</p>}
            <br/>
            <form onSubmit={handleLogin}>
                <input
                name='email'
                type='email'
                placeholder='Your email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <br/>
                <input
                name='pass'
                type='password'
                placeholder='Your password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <br/>
                <button type='submit'>Login</button>
            </form>
        </div>
    )

}

export default LoginPage