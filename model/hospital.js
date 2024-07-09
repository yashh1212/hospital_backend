var mongoose = require("mongoose");

const HospitalSchema = mongoose.Schema({
  Hospital_id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const HospitalModel = mongoose.model("hospital_cred", HospitalSchema);
module.exports = HospitalModel;
