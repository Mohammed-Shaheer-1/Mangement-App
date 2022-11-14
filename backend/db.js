const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/EMPLOYEE',(error,data)=>{
    if(error){
        console.log("connection faild");
    }else{
        console.log("db connected  success");
    }
})

const employee=mongoose.model('Employe',{
        name:String,
        position:String,
        dept:String
    })

const authentication=mongoose.model('User',{
    name:String,
    email:String,
    password:String
})    

module.exports={employee,mongoose,authentication}