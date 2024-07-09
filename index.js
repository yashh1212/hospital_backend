const express=require('express')
const connecttodb=require('./connection')
const userroutes=require('./router/user')
const doctorroutes=require('./router/doctor')
const aptroutes=require('./router/appointment')
const Hospitalroutes=require('./router/Hospital')
const feedback = require("./router/feedback");
const cors=require('cors')
const serverless=require('serverless-http')
require("dotenv").config();


const app=express()
app.use(express.json())
app.use(cors())
connecttodb().then(()=>console.log("connection successful"))

app.use("/user", userroutes);
app.use("/doctor", doctorroutes);
app.use("/appointment", aptroutes);
app.use("/hospital", Hospitalroutes);
app.use("/feedback", feedback);

app.listen(process.env.port, () =>
  console.log("server started at", process.env.port)
);
module.exports = app;
