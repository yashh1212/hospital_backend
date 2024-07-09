const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

const secret = process.env.secret

router.post("/SignIn", async (req, res) => {
  try {
    const { firstname, lastname, email, country, mobile_no, password } =
      req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(208).json({ msg: "user already exist" });
    }
     const salt = await bcrypt.genSalt(10);
    const hash_pass = await bcrypt.hash(password, salt);
    const new_user = await UserModel.create({
      name: firstname + ' '+lastname,
      email,
      country,
      mobile_no,
      password: hash_pass,
    });
     if (new_user) {
      return res.status(201).json("user created successfully");
    }
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ msg: "internal server error" });
  }
});

router.post("/signUp", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  try {
    const user =await UserModel.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(401).json({ msg: "enter valid email or password" });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ msg: "enter valid email or password" });
    }
    const payload = {
      id: user._id,
      name: user.name,
    };
    const token = jwt.sign(payload, secret);
    return res.status(200).json(token);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ msg: "internal server error" });
  }
});
module.exports = router;
