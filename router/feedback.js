const express = require("express");
const mongoose = require("mongoose");
const FeedbakModel = require("../model/feedback");
const { checklogin, checklogin_hospital } = require("../middleware/checklogin");

const router = express.Router();

router.post("/submit_feedback", checklogin, async (req, res) => {
    const{patient_name, pt_emali, pt_number, doctor_name, pt_suggestion, like_to_feedback, facility, friendly, doctor_knowledge, lab_test, treatment, technology,user}=req.body;
    try {
        const feedback=await FeedbakModel.create({user_id:user.id,patient_name,pt_emali,pt_number,doctor_name,pt_suggestion,like_to_feedback,facility,friendly,doctor_knowledge,lab_test,treatment,technology})
        if(feedback){
            return res.status(201).json('response submitted sucecessfully')
        }
         return res.status(400).json("please try again");
    } catch (error) {
        console.log(error)
        return res.status(400).json('internal server error ')
    }
});
module.exports = router;
