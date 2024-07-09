const express = require("express");
const mongoose = require("mongoose");
const aptModel = require("../model/appointment");
const { checklogin } = require("../middleware/checklogin");
const razorpay = require("razorpay");
require("dotenv").config();
const { sendEmail } = require("../controller/send_mail");

const router = express.Router();

router.get("/appointment_confirm", checklogin, async (req, res) => {
  const { doctor_name, speciality } = req.query;
  console.log(speciality);
  try {
    const doctor = await DoctorModel.find({
      $or: [{ doctor_name }, { speciality }],
    });
    if (doctor.length <= 0) {
      return res.status(404).json("doctor not found");
    }
    return res.status(200).json(doctor);
  } catch (error) {
    console.log(error);
    return res.status(401).json("internal server error");
  }
});

router.get("/doctor_information", checklogin, async (req, res) => {
  const dct_id = req.query.doctor_id;
  try {
    const doctor = await DoctorModel.findOne({ _id: dct_id });
    console.log(doctor);
    if (doctor.length <= 0) {
      return res.status(404).json("doctor not found");
    }
    return res.status(200).json(doctor);
  } catch (error) {
    console.log(error);
    return res.status(401).json("internal server error");
  }
});

router.get("/generate-paymentID", checklogin, async (req, res) => {
  const apiKey = process.env.payment_api_key;
  const apiSecret = process.env.payment_api_secret;

  console.log(apiKey);
  const url = "https://api.razorpay.com/v1/orders";
  const headers = {
    "Content-Type": "application/json",
  };

  const data = {
    amount: 100 * 1000,
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  try {
    let instance = new razorpay({
      key_id: apiKey,
      key_secret: apiSecret,
    });
    instance.orders.create(data, (err, order) => {
      if (err) {
        console.log(err);
        return res.status(401).json("internal server error");
      }
      res.status(201).json(order.id);
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json("internal server error");
  }
});

router.post("/appointment-confirm", checklogin, async (req, res) => {
  const {
    patient_name,
    patient_email,
    patient_phone,
    patient_gender,
    doctor_id,
    appointment_date,
    appointment_slot,
    user,
  } = req.body;
 
  try {
    const appointment = await aptModel.create({
      patient_name,
      patient_email,
      patient_phone,
      patient_gender,
      doctor_id,
      appointment_date,
      appointment_slot,
      user_id: user.id,
    });
    if (!appointment) {
      return res.status(401).json("some error occur");
    }
    sendEmail(
      appointment.patient_name,
      appointment._id,
      appointment.doctor_id,
      appointment.appointment_date,
      appointment.appointment_slot,
      appointment.patient_email
    );
    return res.status(201).json("appointment confirmed");
  } catch (error) {
    console.log(error);
    return res.status(401).json("internal server error");
  }
});

router.get("/appointment-history", checklogin, async (req, res) => {
  const user = req.body.user;
   try {
    const apt=await aptModel.find({user_id:user.id})
     if(apt.length > 0){
      return res.status(200).json(apt)
    }
    return res.status(404).json('appointment not found')
  } catch (error) {
     console.log(error);
     return res.status(401).json("internal server error");
  }
});

module.exports = router;
