const express= require('express')
const router=express.Router()
const protect= require('../middleware/auth')

const{ createPost, updatePost, deletePost, getAllPosts, getPostById}=require('../controllers/postController')

router.post('/', protect, createPost)
router.get('/', protect, getAllPosts)
router.get('/:id', getPostById)
router.put('/:id', protect, updatePost)
router.delete('/:id', protect, deletePost)

module.exports= router