const { default: mongoose } = require("mongoose");
const url=process.env.url;
const connecttodb=async()=>{
    mongoose.connect(url);
}

module.exports=connecttodb;
