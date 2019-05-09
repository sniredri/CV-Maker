//Usual React-App
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App'
//Roouter
import { BrowserRouter } from "react-router-dom";
//Redux
import thunk from "redux-thunk"
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import CurrentPageR from "./Store/reducer/CurrentPage"
import FormDataR from "./Store/reducer/FormData"
import UploadPicR from "./Store/reducer/UploadPic"
import locationR from './Store/reducer/locationData'

const rootReducer = combineReducers({
    CurrentPage: CurrentPageR,
    FormData: FormDataR,
    UploadPic: UploadPicR,
    location: locationR
})

const composeEnhancers = process.env.NODE_ENV === "development" ?//make reduxDevTool extension only available in developer mode
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

//Setting app ready
const app = (<Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
