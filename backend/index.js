const express=require('express')
const cors=require('cors')
const router=require('./routes')
const db=require('./db.js')


const app=express()
app.use(express.json())
app.use(cors({
    origin:'http://localhost:4200'
}))


app.use('/employees',router)
app.listen(3000,()=>{
    console.log("port running 3000");
})

