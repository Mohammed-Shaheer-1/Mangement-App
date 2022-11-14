const db = require('./db')
const bcrypt=require('bcrypt')
const promise=require('promise')
// const jwt  = require('jsonwebtoken')

const register=(name,email,password)=>{

    return db.authentication.findOne({"email":email})

    .then(async(user)=>{
       
        if(user){
            
            // const database=db.user.Event.find()
            // console.log(database);
           return{
            statusCode:402,
            status: false,
            message: "allredy exist"
           }
        }else{
            const newuser= new db.authentication({
                name,
                email,
                password
        
            })
          
           newuser.password=await bcrypt.hash(newuser.password,10)
            
           newuser.save()
            return{
                statusCode:200, 
                status:true,
                message: "register successfuly",
                email:email
            }
        }
    })

}

const login=(email,password)=>{
    return new promise((resolve,rejuct)=>{
     db.authentication.findOne({"email":email}).then((user)=>{
      
        if(user){
    bcrypt.compare(password,user.password).then((data)=>{
        console.log("data",data);
            if(data){

            //   const token=jwt.sign({
            //     currentemail:email
            //   }, 'supersecretkey@123')
                 
              let use={
                    statusCode:200,
                    status: true,
                    message:"login success",
                    email:email,
              
                }
                
                resolve(use)
       
            }else{
                let use={
                    statusCode:404,
                    status: true,
                    message:"incorrect password"
                }
                resolve(use)
            }
        })
          
        }else{
            let use={
                statusCode:404,
                status: true,
                message:"incorrect email"
            }
            resolve(use)
        }
    })
})
}

module.exports={register,login}