const bcrypt= require('bcrypt')
const pool = require('../db/index')
const jwt= require('jsonwebtoken')

exports.register=async(req,res)=>{
    const {name, email, password, confirmPassoword}=req.body // the items thatt must be in the body for making request complete
    try{
        const userExist= await pool.query('SELECT * FROM users WHERE email=$1', [email])
        if(userExist.rows.length>0){
            return res.status(400).json({error:"The user already exists"});
        }

        if(password!=confirmPassoword){
            return res.statu(400).json({error:"The passwords do not match"})
        }
        const salt=bcrypt.genSalt(10)
        const hashedPassword=bcrypt.hash(password, salt);

        const newUser=await pool.query('INSERT INTO users (name, email, password, confirmPassword) VALUES ($1, $2, $3, $4)', [name, email, password, confirmPassoword]);
        res.status(201).json({success:"User registered successfuylly", user:newUser.rows[0]});
    }catch(err){
        res.status(500).json({error: err.message})
    }
};

exports.login= async(req,res)=>{
    const { email, password }=req.body;
    try{
        const user= pool.query('SELECT * FROM users where email=$1', [email])
        
        if((await user).rows.length===0){
            return res.status(400).json({error: "The user doesnot exist."})
        }
        const isMatch=await bcrypt.compare(password, (await user).rows[0].password)

        if(!isMatch){
            return res.status(400).json({error: "Invalid email or password"});
        }

        const token=jwt.sign({id:(await user).rows[0].id}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});

        res.json({success: "Login successful"})
    }catch(err){
        res.status(500).json({error: err.message})
    }
}