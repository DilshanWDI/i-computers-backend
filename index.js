import express from "express"
import mongoose from "mongoose"
import userRouter from "./routers/userRouter.js"
import productRouter from "./routers/productRouter.js"
import authenticateUser from "./middlewares/authentication.js"

let app = express()
const mongouri = "mongodb+srv://admin:1234@cluster0.olvoba6.mongodb.net/"

mongoose.connect(mongouri).then(//mong
    () => {
        console.log("Connected to Mongodb")
    }
)


// middlware for convert complex understandless data to understandable data
app.use(express.json())

app.use(authenticateUser)




app.listen(3000, () => {
    console.log("Server is running on port 3000")
})


app.use("/users", userRouter)
app.use("/products", productRouter)