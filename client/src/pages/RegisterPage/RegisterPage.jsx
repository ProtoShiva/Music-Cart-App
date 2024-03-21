import React, { useState } from "react"
import logoImage from "../../assets/image.png"
import style from "../RegisterPage/RegisterPage.module.css"
import axios from "axios"
const RegisterPage = () => {
  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: "",
    mobileNo: "",
    password: ""
  })
  const { email, password, userName, mobileNo } = userInfo

  const handleChange = (e) => {
    const { value, name } = e.target
    setUserInfo({ ...userInfo, [name]: value })
  }

  const validateUserInfo = ({ email, password, userName, mobileNo }) => {
    const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const isValidName = /^[a-z A-Z]+$/
    const isValidNumber = /^[0-9]+$/

    if (!userName.trim()) return { ok: false, error: "Name is missing!" }
    if (!isValidName.test(userName))
      return { ok: false, error: "Invalid name!" }

    if (!mobileNo.trim())
      return { ok: false, error: "Mobile Number is missing!" }
    if (!isValidNumber.test(mobileNo))
      return { ok: false, error: "Invalid Number!" }

    if (!email.trim()) return { ok: false, error: "email is missing" }
    if (!isValidEmail.test(email))
      return { ok: false, error: " Invalid Email!" }

    if (!password.trim()) return { ok: false, error: "Password is missing" }
    if (password.length < 8)
      return { ok: false, error: "Password must be 8 characters long!" }

    return { ok: true }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { ok, error } = validateUserInfo(userInfo)
    if (!ok) return console.log(error)

    try {
      const { data } = await axios.post("/api/user/create", userInfo)
      return data
    } catch (error) {
      const { response } = error
      if (response?.data) return response.data
    }
  }

  return (
    <div className={style.main_container}>
      <nav className={style.heading}>
        <img src={logoImage} alt="logo" />
        <p>Musicart</p>
      </nav>
      <form className={style.form_box} onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <div className={style.email_box}>
          <label htmlFor="userName">Your Name</label>
          <input
            className={style.form_input}
            type="text"
            name="userName"
            value={userName}
            onChange={handleChange}
          />
        </div>
        <div className={style.email_box}>
          <label htmlFor="mobileNo">Mobile Number</label>
          <input
            className={style.form_input}
            type="text"
            name="mobileNo"
            value={mobileNo}
            onChange={handleChange}
          />
        </div>
        <div className={style.email_box}>
          <label htmlFor="email">Email Id</label>
          <input
            className={style.form_input}
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className={style.email_box}>
          <label htmlFor="password">Password</label>
          <input
            className={style.form_input}
            type="text"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <p>
          By enrolling your mobile phone number, you consent to receive
          automated security notifications via text message from Musicart.
          Message and data rates may apply.
        </p>
        <input className={style.form_button} type="submit" value="Continue" />
        <p>
          By continuing, you agree to Musicart privacy notice and conditions of
          use.
        </p>
      </form>
      <section>
        <p>
          Already have an account? <span>Sign In</span>
        </p>
      </section>
      <footer className={style.footer}>Musicart | All rights reserved</footer>
    </div>
  )
}

export default RegisterPage
