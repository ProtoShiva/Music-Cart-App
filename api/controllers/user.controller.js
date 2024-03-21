import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import "dotenv/config"
import { sendError } from "../utils/helper.js"
export const create = async (req, res) => {
  const { userName, email, password, mobileNo } = req.body

  const oldUser = await User.findOne({ email })
  if (oldUser) {
    return res.status(401).json({ error: "this email is already in use!!" })
  }

  const newUser = new User({ userName, email, password, mobileNo })
  await newUser.save()

  res.status(201).json({
    message: newUser
  })
}

export const signIn = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) return sendError(res, "Email/Password mismatch!")

  const matched = await user.comparePassword(password)
  if (!matched) return sendError(res, "Email/Password mismatch!")

  const { _id, name } = user

  const jwtToken = jwt.sign({ userId: _id }, process.env.jwtSecret)

  res.json({
    user: { id: _id, name, email, token: jwtToken }
  })
}
