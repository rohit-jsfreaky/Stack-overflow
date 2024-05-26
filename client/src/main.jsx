import React from 'react'
import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from "react-redux"
import {thunk} from "redux-thunk";
import {applyMiddleware,compose , legacy_createStore as createStore } from  "redux"
import Reducers from "./reducers"
import './i18n'; 

const store = createStore(Reducers,compose(applyMiddleware(thunk)));


ReactDOM.createRoot(document.getElementById('root')).render(
  
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
)