const express = require("express");
const postModel = require("../model/postModel");
const privateRouteMiddle = require("../middleware/privateRouteMiddle");
const postsRoute = express.Router();
const jwt = require("jsonwebtoken");

postsRoute.use(privateRouteMiddle);

postsRoute.get("/", async (req, res) => {
  try {
  
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, "shhhhh", async function (err, decoded) {
      
        const data = await postModel.find({userId:decoded.userId});
        res.send(data);
      });
    
  } catch (err) {
    console.log(err);
  }
});

postsRoute.post("/create", async (req, res) => {
  const { title, content, author } = req.body;
const token = req.headers.authorization.split(" ")[1]

  try {
    if (title && content && author) {

      jwt.verify(token, "shhhhh", async function (err, decoded) {
        if (err) {
          console.log(err);
        }
         else {
          const data = await postModel.create({
            title,
            content,
            author,
            userId:decoded.userId
          });
          
          res.json({ msg: "Post is created succesfully", posts: data });
        }
      });
    } else {
      res.json({ msg: "All fields are required (title,content, author)" });
    }
  } catch (err) {
    console.log(err);
  }
});

postsRoute.patch("/update/:id",async(req,res)=>{
  const token = req.headers.authorization.split(" ")[1]
  const {id} = req.params
  try{
       if(id){
        jwt.verify(token, "shhhhh", async function (err, decoded) {
          if (err) {
            console.log(err);
          }
           else {
            const postdata = await postModel.findOne({_id:id});
         
            if(decoded.userId==postdata.userId){
              await postModel.updateOne({_id:id},req.body);
              res.json({ msg: "Post is Updated succesfully"});
            }
            else{
              res.json({msg:"You are not autherize to make change in this post"})
            }
          }
        });
       }
       else{
        res.json({msg:"Please Provise id for updating the post"})
       }
  }
  catch(err){
    console.log(err)
  }
})

postsRoute.delete("/delete/:id",async(req,res)=>{
  const token = req.headers.authorization.split(" ")[1]
  const {id} = req.params
  try{
       if(id){
        jwt.verify(token, "shhhhh", async function (err, decoded) {
          if (err) {
            console.log(err);
          }
           else {
            const postdata = await postModel.findOne({_id:id});
         
            if(decoded.userId==postdata.userId){
              await postModel.deleteOne({_id:id});
              res.json({ msg: "Post is Deleted succesfully"});
            }
            else{
              res.json({msg:"You are not autherize to make change/delete in this post"})
            }
          }
        });
       }
       else{
        res.json({msg:"Please Provise id for deleting the post"})
       }
  }
  catch(err){
    console.log(err)
  }
})

module.exports = postsRoute;
