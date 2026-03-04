const express = require("express");
const {signup, login, forgetPassword, resetPassword} = require("../Controller/auth");



const auth = express.Router()

auth.post("/signup",  signup)
auth.post("/login", login)
auth.post("/forget", forgetPassword)
auth.post("/reset", resetPassword)

module.exports = auth