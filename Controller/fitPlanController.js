const {generateObject, generateText} = require("ai")
const {fitnessPlanAiPrompt} = require("../utilities/aipromts")
const { googleAi} = require("../config/gemini")
const { aiPlanSchema } = require("../scehmas/fitPlanController")
const FitnessPlanModel = require("../MODELS/FitnessplanModel")





const createFitnessPlan = async (req, res) =>{
    try {
         const user = req.user
        const { age, gender, height, weight, goal, dietPreferance, timePerDay } = user
     const requiredFieds = {age, gender, height, weight, goal,
        dietPreferance, timePerDay
     };

  for (const key in requiredFieds){
    if (!requiredFieds[key]){
        return res.status(400).json({
            message:`${key} is required. Please update your profile.`,
        });
    }
}


            const response = await generateObject({
                model:googleAi("gemini-2.5-flash"),
                prompt:fitnessPlanAiPrompt(user),
                schema:aiPlanSchema
            })
          const plan  = response.object


          const savePlan = await FitnessPlanModel.create({
          userId:user._id,
            ...plan

        })

        res.status(200).json({
            success:true,
            message:"Fitness plan generated successfully",
            plan:savePlan
        })
    } catch (error) {
        console.log(error)
         res.status(500).json({ message: error.message || "Internal Server Error" });
        
    }
}


const  getFitnessPlanHistrory = async (req, res) =>{
    try {
      const userId = req.user._id;
        const plans = await FitnessPlanModel.find({ userId }).sort({createdAt: -1});

        res.status(200).json({
            success:true,
            count:plans.length,
            plans
        })
    } catch (error) {
        res.status(500).json({message:"Unable to fetch history", error})
    }
}



const getLatestFitnessPlan = async (req, res) =>{
    try {
       const userId = req.user._id;
       const latestPlan = await FitnessPlanModel.findOne({ userId}).sort({createdAt: -1});
       
       if(!latestPlan){
        return res.status(404).json({message: "No fitness plan found."});
       }
       res.status(200).json({
        success:true,
        plan:latestPlan
       })

    } catch (error) {
         res.status(500).json({ message: "Unable to fetch latest plan", error }); 
    }
}




const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        fullName: user.fullName,
        email: user.email,
        age: user.age,
        gender: user.gender,
        height: user.height,
        weight: user.weight,
        goal: user.goal,
        dietPreferance: user.dietPreferance,
        timePerDay: user.timePerDay,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};





module.exports = {createFitnessPlan, getFitnessPlanHistrory, getLatestFitnessPlan, getCurrentUser }