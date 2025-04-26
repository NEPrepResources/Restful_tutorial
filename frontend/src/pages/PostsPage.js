import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const PostsPage=()=>{
    const [posts, setPosts]=useState([])
    const [title, setTitle]=useState("")
    const [content, setContent]=useState("")
    const [error, setError]=useState("")
    // const navigate=useNavigate()

    useEffect(()=>{
        const fetchPosts=async()=>{
            try{
                const response=await axios.get('http://localhost:5000/api/posts/',{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                })
                setPosts(response.data)
            }catch(err){
                setError('Failed to fetch posts. Try again!')
            }
        }
        fetchPosts()
    }, [])

    const handleCreatePost= async(e)=>{
        e.preventDefault()
        try{
            await axios.post(
                'http://localhost:5000/api/posts',
                {title,content},
                {
                    headers: {
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                })
            setTitle("")
            setContent("")
            setError("")    
            window.location.reload()
        }catch(err){
            setError("Failed adding post. Try again!")
        }
    }

    // const handleUpdatePost= async(e)=>{
    //     e.preventDefault()

    //     try{
    //         const response=await axios.put()
    //     }
    // }

    return(
        <div>
            <h2>My posts</h2>
            <br/>
            {error && <p>{error}</p>}
            {posts.map((post)=>(
                <div key={post.id}>
                    <h4>{post.title}</h4>
                    <br/>
                    <p>{post.content}</p>
                </div>
            ))}
            <form onSubmit={handleCreatePost}>
                <br/>
                <input
                name="title"
                type="text"
                placeholder="Post Title"
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
                />
                <br />
                <textarea
                name="content"
                type="text"
                placeholder="Post contennt"
                value={content}
                onChange={(e)=>{setContent(e.target.value)}} 
                />
                <br/>
                <button type="submit">Add Post</button>
            </form>
        </div>
    )
}

export default PostsPage;