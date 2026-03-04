const dotenv = require ("dotenv")
dotenv.config()
const express = require ("express")
const cors = require ("cors")
const app = express()
require("./config/Nodemaller") 

app.use(cors())
app.use(express.json ())
app.use(express.urlencoded({ extended: true }))
const auth = require ("./Router/auth")
const connectToDb = require ("./config/ConnectToDb")
const userRouter = require("./Router/userRouter")
const fitplanRouter = require("./Router/fitPlanRouter")

app.use(express.json())

const PORT = 4000
connectToDb()
app.listen(PORT,() =>{
    console.log('server running on port 4000  ✅✅✅✅ ');
    
})
// 


app.use("/api/auth", auth)
app.use("/api/users", userRouter)
app.use("/api/fit-plan", fitplanRouter)
app.use("/api/subscription", require("./Router/subscriptionRouter"))


// baseUrl:http://localhost:4000/