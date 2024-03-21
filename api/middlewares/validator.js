import { check, validationResult } from "express-validator"

export const userValidator = [
  check("userName").trim().not().isEmpty().withMessage("Name is missing!"),
  check("email").normalizeEmail().isEmail().withMessage("Email is Invalid!"),
  check("mobileNo").trim().not().isEmpty().withMessage("Number is missing!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing!")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 characters long!")
]

export const signInValidator = [
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
  check("password").trim().not().isEmpty().withMessage("Password is missing!")
]

export const validate = (req, res, next) => {
  const error = validationResult(req).array()
  const [firstError] = error
  if (error.length) {
    return res.json({ error: firstError.msg })
  }
  next()
}
