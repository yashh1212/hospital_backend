const { config } = require("dotenv");
const nodemailer = require("nodemailer");
require('dotenv').config()
const sendEmail = async (
  patient_name,
  appointment_id,
  doctor_id,
  date,
  slot,
  receiver_mail
) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });

  let message = {
    from: "yash.portfolio.message@gmail.com",
    to: receiver_mail,
    subject: `Your Appointment Details`,
    text: `Dear ${patient_name}, your appointment (ID: ${appointment_id}) with ${doctor_id} has been confirmed for ${date} at ${slot} for Shrikrushna Hospital. You can also book an appt (Physical/Tele consult) via www.HeartCare.com. For any other assistance, WhatsApp 9881967037. Rest assured we are following all safety protocols.`,
  };

  let info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};



const sendEmail_apt = async (
 user_name,id,date,dct_od,
  receiver_mail
) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });

  let message = {
    from: "yash.portfolio.message@gmail.com",
    to: receiver_mail,
    subject: `Your Appointment is cancled`,
    text: `Dear ${user_name}, your appointment (ID: ${id}) for data ${date} to doctor ${dct_od}is cancled`
  };

  let info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};
module.exports = { sendEmail, sendEmail_apt };
