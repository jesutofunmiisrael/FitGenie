// const isActiveSubscriber = async (req, res, next) => {
//     const user = req.user
//     if (user.subscription.status !== "active") {
//         return res.status(403).json({
//             success: false,
//             message: "Unauthorized. Kindly activate your subscription to perform this action"
//         })
//     }

//     next()
// }

// module.exports = isActiveSubscriber