import React, { useState } from "react"
import logoImage from "../../assets/image.png"
import style from "./LoginPage.module.css"

const LoginPage = () => {
  return (
    <div className={style.main_container}>
      <nav className={style.heading}>
        <img src={logoImage} alt="logo" />
        <p>Musicart</p>
      </nav>
      <form className={style.form_box} onSubmit={handleSubmit}>
        <h2>Sign in</h2>
        <div className={style.email_box}>
          <label htmlFor="email">Enter your email or mobile number</label>
          <input
            className={style.form_input}
            type="text"
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

        <input className={style.form_button} type="submit" value="Continue" />
        <p>
          By continuing, you agree to Musicart privacy notice and conditions of
          use.
        </p>
      </form>
      <section className={style.button_box}>
        <p>New to Musicart?</p>
        <input
          className={style.button_input}
          type="button"
          value="Create your Musicart account"
        />
      </section>
      <footer className={style.footer}>Musicart | All rights reserved</footer>
    </div>
  )
}

export default LoginPage
