const { default: mongoose } = require("mongoose");

const connecttodb=async()=>{
    mongoose.connect(
      "mongodb+srv://yashdhokane12:5ncHLAPanNO7cjLQ@hospital.hxp5pet.mongodb.net/hospital_data?retryWrites=true&w=majority&appName=hospital/urlshortener"
    );
}

module.exports=connecttodb;
