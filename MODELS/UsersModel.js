const mongoose = require ("mongoose")
const bcrypt= require("bcryptjs")
const crypto = require("crypto")
const { time } = require("console")




const userSchema = new mongoose.Schema ({
    name:{
        type:String,
        require: true
    },

    email:{
      type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        // minLength: 6 ,
        select : false
    },
    
    age:{
        type:Number,
        // required: true
    },

    gender :{
           type: String,
        enum: ["male", "female"] 
    },
    

   height:{
    type:Number,
// required:true
   },

   weight:{
    type:Number,
// required:true
   },

   goal :{
    type : String,
    trim: true,
    enum:["lose weight", "build muscle"]
   },


dietPreferance:{
type:String,
enum: [ "none", "balanced", "high_protein",  "vergan", "gluten_free", 'vegetarian',],

},


activityLevel:{
type:String,
enum: ['sedentary', 'light',]
},

timePerDay:{
  type: Number, 
    min: 0,
    max: 24 * 60
},

planAccess:{
       type: String,
    enum:['free', 'premium', 'pro'],
  
},

 isVerified: {
        type: Boolean,
        default: false

    },
    isVerifiedtoken: {
        type: String,
        trim: true,
        default: null
    },
    isVerifiedtokenExpiry: {
        type: Date,
        default: null
    },
    subscription: {
        status: {
            type: String,
            enum: ["inactive", "pending", "active"],
            default: "inactive"
        },
        plan: {
            type: String,
            enum: ["quarterly", "monthly", "yearly"]
        },
        startDate: Date,
        endDate: Date,
        reference: String
    },

    
    resetPasswordToken: {
    type: String
  },

  resetPasswordExpires: {
    type: Date
  }



})

const userModel = mongoose.model("users", userSchema)
module.exports = userModel