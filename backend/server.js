const express= require('express')
const cors= require('cors')
const dotenv= require('dotenv')
const userRouter= require('./routes/userRoutes')


dotenv.config()

const app=express()

app.use(cors())
app.use(express.json())

app.use('/api/users', userRouter)


const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`The app is runnig at port ${PORT}`)
})