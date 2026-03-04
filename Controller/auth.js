const userModel  = require ("../MODELS/UsersModel")
const bcrypt = require ("bcryptjs")
const generateString = require ("../utlis/randomstring")
const WelcomeEmail = require("../maintameplate/welcomeEmail")
const Jwt = require("jsonwebtoken")
const crypto = require("crypto");
const sendEmail= require("../mailtemplate/sendotp")

const signup = async (req,res) =>{
    const {password, name, email} = req.body;


    try {
        const salt = await bcrypt.genSalt(10)
        const hasedPassword = await bcrypt.hash(password, salt)
 const verificationToken = generateString(8);

    const verificationExp = Date.now() + 1000 * 60 * 10;

    
    const user = await userModel.create({
      ...req.body,
      password: hasedPassword,
      verificationToken,
      verificationExp,
    

    })

       const token = Jwt.sign({ email, id: user._id }, process.env.jwt_secret, {
      expiresIn: process.env.jwt_exp,
    });


    if(!user) {
        return res.status(400).json({
            success:false,
            message:"signup unsuccesfully"
        })
    }

    const sendmail = WelcomeEmail (name,email)
     res.status(201).json({
      success: true,
      message: "Signup successful  ✅", 
      sendmail,
      user,
      token,
    });

    } catch (error) {
console.log(error);

    }
}





const login = async(req,res) =>{
    const {email, password} = req.body

    try {
        const user = await userModel.findOne({email}).select("+password")

        if (!user){
            return res.status(404).json({
                success:false,
                message:"emaill or password incorrcet"
            })

        }


        const iscorrect = await bcrypt.compare(password, user.password)

          if (!iscorrect){
        return res.status(403).json({
           success: false,
                message: "Email or password is incorrect"
        })
      }

      const token = Jwt.sign({email, id:user._id}, process.env.jwt_secret, {
        expiresIn:process.env.jwt_exp
      })

      res.status(200).json({
        success:true,
        token
      })
    } catch (error) {
     console.log(error);
     
    }
}



// const login = async (req, res) =>{
//     const {password, email} = req.body;

//     try {
//     const user = await userModel.findOne({email}).select(" +password");

//     if(!user || !(await bcrypt.compare(password,user.password))){
//         return res.status(401).json({
//             sucess:false,
//             message: "Email or password is incorrect ❌"
//         })
//     }

//     const token = jwt.sign(
//         {email, id: user._id},
//         process.env.JWT_SECRET,
//     {expiresIn: process.env.JWT_EXP }
//     );
    
//   res.status(200).json({
//     success: true,
//     token,
//     user: {
//         id: user._id,
//         name: user.name,        
//         email: user.email,
//         accountNumber: user.accountNumber,
//         balance: user.balance || 500000  
//     },
//     message: "Login successful ✅"
// });

        
//     } catch (error) {
//         console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Server error ❌"
//     });
//     }
// }




const forgetPassword = async (req, res) => {
    const {email} = req.body

    try {
        const user = await userModel.findOne({email})

        if(!user){
        return res.status(404).json({
            success:false,
            message:"this email does not exist ❌"
        })
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(otp);

        const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");


        user.resetPasswordToken = hashedOtp;

        user.resetPasswordExpires = Date.now() +1000 * 60 * 10;
        await user.save();

        const sendmail = sendEmail(user.name, user.email,otp)
        res.status(200).json({
            success:true,
            message:"OTP sent to email",
            sendmail
        })
        
    } catch (error) {
        console.log(error);
        
    }
    
}





const resetPassword = async (req, res) =>{
 const {email, otp, newPassword} = req.body;

 if(!otp || !newPassword || !email){
    return res.status(400).json({
        success:false,
        message:"Missing required fieids(email, otp, ornewPassword )"
    })
 }

 try {
    const hashedOtp = crypto.createHash("sha256").update(otp.toString()).digest("hex");
    const user = await userModel.findOne({
        email,
        resetPasswordToken:hashedOtp,
        resetPasswordExpires:{ $gt: Date.now() }
    });
       if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
        
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    user.password = hashedPassword
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful ✅",
    });


 } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error resetting password",
    })
 }


}







module.exports= {signup, login, forgetPassword, resetPassword}