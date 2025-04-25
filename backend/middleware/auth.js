const jwt= require('jsonwebtoken')

const protect=(req,res,next)=>{
    const authHeader=req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            error:"No token given"
        })
    }

    const token= authHeader.split(" ")[1]
    try{
        const decoded=jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user=decoded;
        next();
    }catch(err){
        res.status(401).json({
            error:'Invalid Token'
        })
    }
}

module.exports=protect