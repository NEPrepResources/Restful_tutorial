const express = require('express')
const router=express.Router()
const {register, login}= require('../controllers/userController')

router.get('/test', (req,res)=>{
    res.json({message:'Testing api working🎉'});// router to get a given thing, here it's to get this message
})

router.post('/register', register)
router.post('/login', login)

module.exports= router;