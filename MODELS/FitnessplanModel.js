const mongoose = require("mongoose")


const ExerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true }
}, { _id: false });

const WorkoutDaySchema = new mongoose.Schema({
    day: { type: String, required: true },
    focus: { type: String, required: true },
    exercises: { type: [ExerciseSchema], required: true }
}, { _id: false });

const MealSchema = new mongoose.Schema({
    meal: { type: String, required: true },
    items: { type: [String], required: true }
}, { _id: false });

const WeekSchema = new mongoose.Schema({
    week: { type: Number, required: true },
    workout: { type: [WorkoutDaySchema], required: true },
    nutrition: {
        dailyCalories: { type: Number, required: true },
        macros: {
            protein: { type: String, required: true },
            carbs: { type: String, required: true },
            fat: { type: String, required: true }
        },
        meals: { type: [MealSchema], required: true }
    }
}, { _id: false });

const FitnessPlanSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    summary: {
        goal: { type: String, required: true },
        durationDays: { type: Number, default: null },
        timePerDay: { type: String, required: true },
        dietPreference: { type: String, required: true }
    },

    weeklyPlan: { type: [WeekSchema], required: true },

    tips: { type: [String], required: true },

    createdAt: { type: Date, default: Date.now }
});

const FitnessPlanModel = mongoose.model("FitnessPlan", FitnessPlanSchema);
module.exports = FitnessPlanModel;

