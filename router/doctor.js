const express = require("express");
const mongoose = require("mongoose");
const DoctorModel = require("../model/doctor");
const { checklogin ,checklogin_hospital} = require("../middleware/checklogin");

const router = express.Router();

router.get("/search_doctor", checklogin, async (req, res) => {
  const { doctor_name, speciality } = req.query;
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
     if (doctor.length <= 0) {
      return res.status(404).json("doctor not found");
    }
    return res.status(200).json(doctor);
  } catch (error) {
    console.log(error);
    return res.status(401).json("internal server error");
  }
});

router.get("/doctot-list", checklogin_hospital, async (req, res) => {
  try {
    const doctors = await DoctorModel.find({});
     if (!doctors) {
      return res.status(401).json("data not found");
    }
    return res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    return res.status(401).json("internal server error");
  }
});

router.get("/speciality_search", checklogin,async (req, res) => {
  const speciality = req.query.speciality;
   try {
    const doctors=await DoctorModel.find({speciality})
     if (doctors.length > 0){
      return res.status(200).json(doctors)
    }
     return res.status(404).json('not found');
  } catch (error) {
     console.log(error);
     return res.status(401).json("internal server error");
  }
});

router.get("/doctor_information",checklogin,async(req,res)=>{
    const doctor_id = req.query;
 
    try {
      const doctor=await findById(doctor_id)
      if(doctor){
        return res.status(200).json(doctor)
      }
      return res.status(404).json('doctor not found')
    } catch (error) {
       console.log(error);
       return res.status(401).json("internal server error");
    }
});
module.exports = router;
