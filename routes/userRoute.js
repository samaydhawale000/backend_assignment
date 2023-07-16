const express = require("express")
const userModel = require("../model/userModel")
const bcrypt = require('bcrypt');
const registerMiddle = require("../middleware/registerMiddleware");
var jwt = require('jsonwebtoken');
const authMiddle = require("../middleware/authMiddle");

const userRoute = express.Router()

userRoute.post("/register",registerMiddle, async(req,res)=>{
    try{
        const {name, email, password} = req.body
        bcrypt.hash(password, 5, async(err, hash)=> {
            if(err){
                console.log(err)
            }
            await userModel.insertMany([{name,email,password:hash}])
            res.json({msg:"User registered successfully", user:req.body})
        });
    }
    catch(err){
        res.json({msg:"Something is Wrong with registration"})
    }
})

userRoute.post("/login",authMiddle, async(req,res)=>{
    try{
        const {email, password,userId} = req.body
       const data = await userModel.findOne({email})
  console.log(data)
       if(data.email){
        bcrypt.compare(password, data.password, (err, result)=> {
            if(result){
                var token = jwt.sign({userId}, 'shhhhh');
                res.json({msg:"User Login successfully", token:token})
            }
            else{
                res.json({msg:"User Login credencials are wrong !"})
            }
        });
       }
       else{
        res.json({msg:"User Login credencials are wrong !"})
       }
       
    }
    catch(err){
        res.json({msg:"Something is Wrong with login"})
    }
})

module.exports= userRoute