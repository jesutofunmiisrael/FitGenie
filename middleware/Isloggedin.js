const jwt = require("jsonwebtoken")

const userModel = require("../MODELS/UsersModel")

const blacklistedTokenModel = require("../MODELS/balckListedToken")





const isLoggedIn = async (req, res, next) => {
try {
   let token;

   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
   }



   if(!token) {
      return res.status(403).json({
        success:false,
        message:"Token is required"
      })
   }

   const { email } = jwt.verify(token, process.env.jwt_secret)


   const isBlacklisted = await blacklistedTokenModel.findOne({token})

   if(isBlacklisted){
    return res.status(403).json({
        success:false,
        message:"Token is invalid: blacklisted"
    })
   }

   const user = await userModel.findOne({email}) 

   if(!user){
    return res.status (404).json({
        success:false,
        message:"user not found"
    })
   } 
   req.user = user


    next() 
} catch (error) {
    console.log(error);
      if (error.message === "jwt malformed") {
            return res.status(400).json({ success: false, message: "Token is invalid" })
        } else if (error.message === "jwt expired") {
            return res.status(400).json({ success: false, message: "TOken has expired. kindly login again" })
        } else {
            return res.status(400).json({ success: false, message: error.message || "something went wrong" })
        }
    
}
}
 
module.exports = isLoggedIn

