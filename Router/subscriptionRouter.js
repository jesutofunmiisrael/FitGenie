const express = require("express")
const isLoggedIn = require("../middleware/Isloggedin")
const { initializeSubscription } = require("../Controller/subcribtioncontroller")

const subscriptionRouter = express.Router()

subscriptionRouter.post("/initialize", isLoggedIn, initializeSubscription)

subscriptionRouter.post("/webhook", express.raw({type: "*/*"}), )

module.exports = subscriptionRouter