const express = require("express");
const mongoose = require("mongoose");
const HospitalModel = require("../model/hospital");
const aptModel=require('../model/appointment')
const bcrypt = require("bcryptjs");
const { checklogin_hospital } = require("../middleware/checklogin");
const jwt = require("jsonwebtoken");
const {sendEmail_apt}=require('../controller/send_mail')
require("dotenv").config();

const router = express.Router();
const secret = process.env.hospital_secret;
router.post("/sign-in", async (req, res) => {
  const { Hospital_id, password } = req.body;
 if (Hospital_id.length > 24 || Hospital_id.length < 24) {
   return res.status(401).json("enter correct id or password");
 }
   try {
      const hospital = await HospitalModel.findById(Hospital_id);
     if (hospital) {
       const correct = await bcrypt.compare(password, hospital.password);
       if (correct) {
         const payload = {
           id: hospital._id,
         };
         const token = await jwt.sign(payload, secret);
         console.log(token)
         return res.status(200).json(token);
       }
       return res.status(401).json("enter correct id or password");
     }
     res.status(401).json("enter correct id or password");
   } catch (error) {
     console.log(error);
     return res.status(400).json("internal server error");
   }
});



router.get("/appointment-list", checklogin_hospital, async (req, res) => {
  try {
    const appointments = await aptModel.find({});
    if (appointments) {
      return res.status(200).json(appointments);
    } else {
      return res.status(404).json("appointments not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json("internal server error");
  }
});

router.delete("/delete-appointment", checklogin_hospital, async (req, res) => {
  const apt_id = req.query.id;
  console.log(apt_id);
  try {
    const apt=await aptModel.findOneAndDelete({ _id: apt_id })
    if (apt) {
      console.log(apt)
      if(sendEmail_apt(apt.apt, apt._id, apt.appointment_date, apt.doctor_id,apt.patient_email)){

        return res.status(200).json("appointment deleated succcessfully");
      }
    } else {
      return res.status(404).json("appointment not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json("internal server error");
  }
});

module.exports = router;
