const { meta } = require("../config/Nodemaller")
const userModel = require("../MODELS/UsersModel")

const crypto = require("crypto")
const {getEndDate} = require("../utlis/utilis")




const initializeSubscription  = async (req, res) =>{
    try {
    const user = req.user
    const {plan} = req.body
    if (!plan) return res.status(400).json({success:false, message:"Plan is required"})
        const planAmount ={
          monthly: 10000 * 100,
            quarterly: 28000 * 100,
            yearly: 99999 * 100   
        }

        const amount = planAmount [plan]

        if(!amount) return res.status(400).json({
            success:false, message: "invalid plan"
        })

        const data = {
            email:user.email,
            amount,
            metadata:{
                userId: user._id,
                plan
            }
        }

        const response = await fetch("https://api.paystack.co/transaction/initialize", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SERECT_KEY }`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const resData = await response.json()
        res.status(200).json(resData)

    } catch (error) {
            console.log(error)
    }
}

const activateSubscription = async (req, res) => {
    try {
        console.log(req.headers)
        const hash = crypto.createHmac("sha512", process.env.PAYSTACK_SERECT_KEY )
        const updatedHash = hash.update(req.body).digest("hex")
        if (updatedHash !== req.headers["x-paystack-signature"]) {
            return res.status(401).send("Invalid signature")
        }
        const body = JSON.parse(req.body)
        console.log(body)
        if (body.event == "charge.success") {
            const { userId, plan } = body.data.metadata
            const reference = body.data.reference

            const startDate = new Date()
            const endDate = getEndDate(plan)

            await userModel.findByIdAndUpdate(userId, {
                subscription: {
                    status: "active",
                    plan,
                    startDate,
                    endDate,
                    reference
                }
            })
        }

        return res.status(200).send("Subscription activated!!")
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: error.message || "Unable to activate subscriiton", error })
    }
}



module.exports = {
    initializeSubscription
}