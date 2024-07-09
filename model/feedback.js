var mongoose = require("mongoose");

const FeedbackSchema = mongoose.Schema({
  user_id:{
    type:String,
    required:true
  },
  patient_name: {
    type: String,
    required: true,
  },
  pt_emali: {
    type: String,
    required: true,
  },
  pt_number: {
    type: String,
    required: true,
  },
  doctor_name: {
    type: String,
    required: true,
  },
  pt_suggestion: {
    type: String,
    required: true,
  },
  like_to_feedback: {
    type: String,
    required: true,
  },
  facility: {
    type: String,
    required: true,
  },
  friendly: {
    type: String,
    required: true,
  },
  doctor_knowledge: {
    type: String,
    required: true,
  },
  lab_test: {
    type: String,
    required: true,
  },
  technology: {
    type: String,
    required: true,
  },
  treatment: {
    type: String,
    required: true,
  }
});
 


const FeedbakModel = mongoose.model("feedback_info", FeedbackSchema);
module.exports = FeedbakModel;
