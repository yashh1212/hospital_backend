const { default: mongoose } = require("mongoose");

const connecttodb=async()=>{
    mongoose.connect(
      "yash"
    );
}

module.exports=connecttodb;
