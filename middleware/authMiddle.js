const userModel = require("../model/userModel")

const authMiddle =async (req,res,next)=>{
const {email,password} = req.body

    try{
        
          if(email && password){
           const data =  await userModel.findOne({email})
           if(data.email){
            req.body.userId = data._id
            next()
           }
           else{
            res.json({msg:"Your credencials are wrong"})
           }
          }
          else{
            res.json({msg:"Your credencials are wrong"})
          }
    }
    catch(err){
        console.log(err)
        console.log("Something is wrong with Authentication")
    }
 
}

module.exports=authMiddle