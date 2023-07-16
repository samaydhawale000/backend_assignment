
const mongoose = require("mongoose")

const dbConnection =  mongoose.connect("mongodb+srv://samaydhawale1:Samay123@cluster0.fcetjfm.mongodb.net/fullStack?retryWrites=true&w=majority")

module.exports = dbConnection