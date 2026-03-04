const express = require("express")
const {updateUserProfile, getMe} = require("../Controller/usercontroller")
const isLoggedIn = require("../middleware/Isloggedin")

const userRouter = express.Router()
userRouter.put("/profile", isLoggedIn, updateUserProfile)

userRouter.get("/me", isLoggedIn, getMe )




module.exports = userRouter


