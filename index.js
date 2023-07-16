const express = require("express")
const dbConnection = require("./db")
const userRoute = require("./routes/userRoute")
const postsRoute = require("./routes/postsRoute")
var cors = require('cors');
const app = express()


app.use(express.json())
app.use("/users", userRoute)
app.use("/posts", postsRoute)
app.use(cors());



app.get("/",(req,res)=>{
    res.send("Home")
})

app.listen(8080,async()=>{
    try{
       await dbConnection
        console.log("DB connected")
        console.log("port is running on 8080")
    }
    catch(err){
        console.log(err)
    }
})