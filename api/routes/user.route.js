import express from "express"
import { create, signIn } from "../controllers/user.controller.js"
import {
  userValidator,
  validate,
  signInValidator
} from "../middlewares/validator.js"
const router = express.Router()

router.post("/create", userValidator, validate, create)

router.post("/sign-in", signInValidator, validate, signIn)

export default router
