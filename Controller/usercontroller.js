const userModel = require("../MODELS/UsersModel");

const updateUserProfile = async (req, res) => {

    try {
        
       const userId = req.user._id
    const updateData = req.body
        const {age, gender, height, weight, goal, timePerDay, dietPreferance} = updateData

        if (!age) return res.status(400).json({message: "age is requried"})
      if (!gender) return res.status(400).json({message: "gender is requried"})
      if (!height) return res.status(400).json({message: "height is requried"})
         if (!weight) return res.status(400).json({message: "Weight is requried"})  
         if (!goal) return res.status(400).json({message: "goal is requried"})
      if (!timePerDay) return res.status(400).json({message: "timeperDay is requried"})
          if (!dietPreferance) return res.status(400).json({message: "dietPreferance is requried"})


        const updateUser = await userModel.findByIdAndUpdate(userId, updateData, {new: true});
         if(!updateUser){
            return res.status(404).json({
                success:false,
                message:"unable to updated users"
            })
        }

        res.status(200).json({
            success:true,
            message:"users update succesfully",
        user: updateUser 
        })
    } catch (error) {
        console.log(error);
          res.status(500).json({ message: 'Server error', error: error.message });
        
    }
    
}

const getMe = async (req, res) => {
  try {
  
    const userId = req.user._id;

    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};







module.exports = {updateUserProfile, getMe }

