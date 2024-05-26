/*import React, { useState } from 'react'
import './Auth.css'
import icon from "../../assets/icon.png"
import AboutAuth from './AboutAuth';
import { signUp, login } from '../../actions/auth';
import { useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { useTranslation } from "react-i18next";

const Auth = () => {
  const { t } = useTranslation();

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = () => {
    setIsSignup(!isSignup)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email && !password) {
      alert(t("auth.enterEmailPassword"));
    }
    if (isSignup) {
      if (!name) {
        alert(t("auth.enterName"));
      }

      dispatch(signUp({ name, email, password }, navigate))
    } else {
      dispatch(login({ email, password }, navigate))
    }
  }

  return (
    <section className='auth-section'>
      {isSignup && <AboutAuth />}
      <div className='auth-container-2'>
        {!isSignup && <img src={icon} alt='stack-overflow' className='login-logo' />}
        <form onSubmit={handleSubmit}>
          {
            isSignup && (
              <label htmlFor="name">
                <h4>{t("auth.displayName")}</h4>
                <input type="text" name='name' id='name' onChange={(e) => { setName(e.target.value) }} />
              </label>
            )
          }
          <label htmlFor="email">
            <h4>{t("auth.email")}</h4>
            <input type="email" name='email' id='email' onChange={(e) => (setEmail(e.target.value))} />
          </label>
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>{t("auth.password")}</h4>
              {!isSignup && <Link to="/forgot-password" style={{ color: "#007ac6", fontSize: "13px", marginTop: "15px" }}>{t("auth.forgotPassword")}</Link>}
            </div>
            <input type="password" name='password' id='password' onChange={(e) => (setPassword(e.target.value))} />
            {isSignup && <p style={{ color: "#666767", fontSize: "13px" }}>{t("auth.passwordHint")}</p>}
          </label>
          {
            isSignup && (
              <label htmlFor="check">
                <input type="checkbox" name="check" id="check" />
                <p style={{ fontSize: "13px" }}>{t("auth.optIn")}</p>
              </label>
            )
          }
          <button type='submit' className='auth-btn'>{isSignup ? t("auth.signup") : t("auth.login")}</button>
          {
            isSignup && (
              <p style={{ color: "#666767", fontSize: "13px" }}>
                {t("auth.agreement")}
              </p>
            )
          }
        </form>
        <p>
          {isSignup ? t("auth.alreadyHaveAccount") : t("auth.dontHaveAccount")}
          <button type='button' className='handle-switch-btn' onClick={handleSwitch}>
            {isSignup ? t("auth.login") : t("auth.signup")}
          </button>
        </p>
      </div>
    </section>
  )
}

export default Auth
*/

import React, { useState, useEffect } from 'react';
import './Auth.css';
import icon from "../../assets/icon.png";
import AboutAuth from './AboutAuth';
import { signUp, login } from '../../actions/auth';
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UAParser from 'ua-parser-js';
import axios from 'axios';

const Auth = () => {
  const { t } = useTranslation();
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ip, setIp] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIp = async () => {
      const response = await axios.get('https://api.ipify.org?format=json');
      setIp(response.data.ip);
    };
    fetchIp();
  }, []);

  const handleSwitch = () => {
    setIsSignup(!isSignup);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email && !password) {
      alert(t("auth.enterEmailPassword"));
      return;
    }
    if (isSignup && !name) {
      alert(t("auth.enterName"));
      return;
    }

    const parser = new UAParser();
    const result = parser.getResult();
    const browser = result.browser.name;
    const os = result.os.name;
    const device = result.device.type || 'desktop';

    console.log(browser);

    const authData = { name, email, password, ip, browser, os, device };

    if (isSignup) {
      dispatch(signUp(authData, navigate));
    } else {
      const browserVerify = localStorage.getItem('isOtpMatched')
      if (browser === 'Chrome' && !browserVerify) {
        alert("First you have to verify your Email");
        navigate("/browser-verify")
      } else {
        dispatch(login(authData, navigate));
      }

    }
  }

  return (
    <section className='auth-section'>
      {isSignup && <AboutAuth />}
      <div className='auth-container-2'>
        {!isSignup && <img src={icon} alt='stack-overflow' className='login-logo' />}
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <label htmlFor="name">
              <h4>{t("auth.displayName")}</h4>
              <input type="text" name='name' id='name' onChange={(e) => setName(e.target.value)} />
            </label>
          )}
          <label htmlFor="email">
            <h4>{t("auth.email")}</h4>
            <input type="email" name='email' id='email' onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>{t("auth.password")}</h4>
              {!isSignup && <Link to="/forgot-password" style={{ color: "#007ac6", fontSize: "13px", marginTop: "15px" }}>{t("auth.forgotPassword")}</Link>}
            </div>
            <input type="password" name='password' id='password' onChange={(e) => setPassword(e.target.value)} />
            {isSignup && <p style={{ color: "#666767", fontSize: "13px" }}>{t("auth.passwordHint")}</p>}
          </label>
          {isSignup && (
            <label htmlFor="check">
              <input type="checkbox" name="check" id="check" />
              <p style={{ fontSize: "13px" }}>{t("auth.optIn")}</p>
            </label>
          )}
          <button type='submit' className='auth-btn'>{isSignup ? t("auth.signup") : t("auth.login")}</button>
          {isSignup && (
            <p style={{ color: "#666767", fontSize: "13px" }}>
              {t("auth.agreement")}
            </p>
          )}
        </form>
        <p>
          {isSignup ? t("auth.alreadyHaveAccount") : t("auth.dontHaveAccount")}
          <button type='button' className='handle-switch-btn' onClick={handleSwitch}>
            {isSignup ? t("auth.login") : t("auth.signup")}
          </button>
        </p>
      </div>
    </section>
  )
}

export default Auth;
