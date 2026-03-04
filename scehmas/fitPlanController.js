const { z } = require("zod");

const summarySchema = z.object({
    goal: z.enum(["lose weight", "maintain weight", "gain weight"]),
    durationDays: z.number().positive().int().nullable().optional(),
    timePerDay: z.string(),
    dietPreference: z.enum([
        "none",
        "balanced",
        "high_protein",
        "vegetarian",
        "vegan",
        "gluten_free",
    ]),
});

const weekSchema = z.object({
    week: z.number().positive().int(),
    workout: z.array(
        z.object({
            day: z.enum([
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
            ]),
            focus: z.string(),
            exercises: z.array(
                z.object({
                    name: z.string(),
                    sets: z.number().positive().int(),
                    reps: z.number().positive().int(),
                })
            ),
        })
    ),

    nutrition: z.object({
        dailyCalories: z.number().positive().int(),
        macros: z.object({
            protein: z.string(),
            carbs: z.string(),
            fat: z.string(),
        }),
        meals: z.array(
            z.object({
                meal: z.string(),
                items: z.array(z.string()),
            })
        ),
    }),
});

const aiPlanSchema = z.object({
    summary: summarySchema,
    weeklyPlan: z.array(weekSchema),
    tips: z.array(z.string()),
});

module.exports = { aiPlanSchema };


