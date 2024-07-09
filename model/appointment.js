var mongoose = require("mongoose");

const aptSchema = mongoose.Schema({
  patient_name: {
    type: String,
    required: true,
  },
  patient_email: {
    type: String,
    required: true,
  },
  patient_phone: {
    type: Number,
    required: true,
  },
  patient_gender: {
    type: String,
    required: true,
  },
  appointment_date: {
    type: String,
    required: true,
  },
  appointment_slot: {
    type: String,
    required: true,
  },
  doctor_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

const aptModel = mongoose.model("apt_info", aptSchema);
module.exports = aptModel;
