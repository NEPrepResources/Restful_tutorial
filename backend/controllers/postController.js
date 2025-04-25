const pool = require('../db/index')

exports.createPost=async(req,res)=>{
    const {title, content}=req.body
    const userID= req.user.id

    try{
        const newPost=await pool.query(
            'INSERT INTO POSTS(title, content, user_id) VALUES ($1, $2, $3) RETURNING *', [title, content, userID]
        )

        res.status(201).json(newPost.rows[0])
    }catch(err){
        return res.status(500).json({error: err.message})
    };
}

exports.getAllPosts=async(req,res)=>{
    try{
        const allPosts=await pool.query(
            'SELECT * FROM posts'
        )
        res.json(allPosts.rows)
    }catch(err){
        return res.status(500).json({error:err.message})
    }
}

exports.getPostById=async(req,res)=>{
    const {id}=req.params
    try{
        const postById=await pool.query('SELECT * FROM posts where id=$1', [id])

        if(postById.rows.length===0){
            return res.status(400).json({error:'The post not found'})
        }

        res.json(postById.rows[0])
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}

exports.updatePost=async(req,res)=>{
    const {id}=req.params;
    const {title, content}=req.body;
    const {userID}=req.user.id;

    try{
        const existing=await pool.query('SELECT * FROM posts WHERE id=$1', [id])

        if(existing.rows.length===0 || existing.rows[0].user_id!==userID){
            return res.status(400).json({
                error:'Unauthorized to update this post'
            })
        }

        const updated= await pool.query('UPDATE posts SET title=$1, content=$2 WHERE id=$3 RETURNING *', [title, content, id]);

        res.json(updated.rows[0])
    }catch(err){
        return res.status(500).json({error:err.message})
    }
}

exports.deletePost=async(req,res)=>{
    const {id}=req.params;
    const userId=req.user.id;

    try{
        const existing= await pool.query('SELECT * FROM posts where id=$1', [id])

        if(existing.rows.length===0 || existing.rows[0].user_id!==userId){
            return res.status(400).json({
                error:'User not authorized to delete this post'
            })
        }

        await pool.query('DELETE FROM posts WHERE id=$1', [id])
        res.json({
            success:'Post deleted successfully'
        })
    }catch(err){
        return res.status(500).json({
            error:err.message
        })
    }
}

