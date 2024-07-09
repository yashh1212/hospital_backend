var mongoose = require("mongoose");

const DoctorSchema = mongoose.Schema({
  doctor_name: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  area_of_expertise: {
    type: String,
    required: true,
  },
});

const DoctorModel = mongoose.model("Doctor_info", DoctorSchema);
module.exports = DoctorModel;
