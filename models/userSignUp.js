const mongoose = require('mongoose');
const passwordComplexity = require("joi-password-complexity");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSignUpSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String},
  email: { type: String, required: true },
  password: { type: String, required: true},
  phoneNo: { type: Number },
});

module.exports = mongoose.model("userSignUp", userSignUpSchema);
