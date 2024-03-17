import express from 'express'
import router from './routes/auth.routes.js'
import cors from 'cors'
// app
const app = express()
const PORT = process.env.PORT || 5001


//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

//use routes
app.use("/api/auth/v1",router)

// default
app.get("/",(req,res)=>{
    res.json({
        "msg":"Yes It Works!"
    })
})


//listen
app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`)
})