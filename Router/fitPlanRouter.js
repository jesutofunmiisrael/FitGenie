const express = require("express")
const { createFitnessPlan, getFitnessPlanHistrory, getLatestFitnessPlan} = require("../Controller/fitPlanController")
const Isloggedin = require("../middleware/Isloggedin")
// const isActiveSubscriber = require("../middleware/subscription")


const fitplanRouter = express.Router()

fitplanRouter.post("/create", Isloggedin, createFitnessPlan)
fitplanRouter.get("/history", Isloggedin,  getFitnessPlanHistrory)
fitplanRouter.get("/latest", Isloggedin,  getLatestFitnessPlan)


module.exports = fitplanRouter
