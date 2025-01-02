const { config } = require("dotenv");
require('dotenv').config()
const { default: mongoose } = require("mongoose");
const url=process.env.url;
const connecttodb=async()=>{
    mongoose.connect(url);
}

module.exports=connecttodb;
