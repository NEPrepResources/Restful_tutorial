const express = require('express')
const router=express.Router()

router.get('/test', (req,res)=>{
    res.json({message:'Testing api working🎉'});// router to get a given thing, here it's to get this message
})

// router.post

module.exports= router;