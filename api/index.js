import express from "express"
import connectDB from "./db/db.js"
import "express-async-errors"
import userRouter from "./routes/user.route.js"
import cors from "cors"
import morgan from "morgan"
import { errorHandler } from "./middlewares/error.js"
import { handleNotFound } from "./utils/helper.js"
const app = express()
const port = 8000
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173"
  })
)
app.use(express.json())
app.use(morgan("dev"))
app.use("/api/user", userRouter)

app.use("/*", handleNotFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server listening at port ${port}`)
})
