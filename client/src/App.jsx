import {BrowserRouter as Router, Link,Route} from 'react-router-dom'
import {useDispatch} from "react-redux"
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { useDebugValue, useEffect } from 'react'
import { fetchAllQuestion } from './actions/question'
import { useTranslation } from 'react-i18next'
import AllRoutes from './AllRoutes' 
import { fetchAllUsers } from './actions/users'
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher'

function App() {

  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(fetchAllQuestion())
    dispatch(fetchAllUsers())
  },[dispatch ])

  return (
    <>
    <Router>
      <Navbar/>
      <AllRoutes/>
    </Router>
    </>
  )
}

export default App
