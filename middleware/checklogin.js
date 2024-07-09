const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.secret;
const hs_secret = process.env.hospital_secret;

const checklogin = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (token) {
      const data = await jwt.verify(token, secret);
      req.body.user = data;
       next();
    } else {
        return res.status(401).json({msg:"authentication failed"})
    }
  } catch (error) {
    console.log(error)
    return res.status(401).json({ msg: "authentication failed" });
  }
};
const checklogin_hospital = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (token) {
      const data = await jwt.verify(token,hs_secret);
      req.body.user = data;
       next();
    } else {
        return res.status(401).json({msg:"authentication failed"})
    }
  } catch (error) {
    console.log(error)
    return res.status(401).json({ msg: "authentication failed" });
  }
};

module.exports={ checklogin, checklogin_hospital };
