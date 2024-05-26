import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import "./HomeMainbar.css"
import Question from './Question'
import QuestionsList from './QuestionsList'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

const HomeMainbar = () => {
  const { t } = useTranslation();

  const location = useLocation();
  const user = 1;
  const navigate = useNavigate();
  const questionList = useSelector((state) => state.questionReducer);

  const checkAuth = () => {
    if (user === null) {
      alert(t("home.loginSignupAlert"));
      navigate("/Auth");
    } else {
      navigate("/AskQuestion");
    }
  }

  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
        {location.pathname === '/' ? <h1>{t("home.topQuestion")}</h1> : <h1>{t("home.allQuestion")}</h1>}
        <button onClick={checkAuth} className='ask-btn'>{t("home.askQuestion")}</button>
      </div>
      <div>
        {questionList.data === null ? <h1>{t("home.loading")}</h1> :
          <>
            <p>{questionList.data.length} {t("home.questionCount")}</p>
            <QuestionsList questionList={questionList.data} />
          </>}
      </div>
    </div>
  )
}

export default HomeMainbar
