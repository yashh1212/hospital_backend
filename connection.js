const { default: mongoose } = require("mongoose");

const connecttodb=async()=>{
    mongoose.connect(
      "mongodb+srv://yashdhokane12:NMJ1fDWfMfFmQQHr@hospital.hxp5pet.mongodb.net/?retryWrites=true&w=majority&appName=hospital"
    );
}

module.exports=connecttodb;