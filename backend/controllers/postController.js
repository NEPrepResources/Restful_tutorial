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
        return res.status(400).json({error: err.message})
    };
}