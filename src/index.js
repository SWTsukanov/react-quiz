import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {createStore,applyMiddleware} from "redux";
import {Provider} from "react-redux";
import rootReducer from "./store/reducers/rootReducer";
import thunk from "redux-thunk";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const store = createStore(rootReducer,applyMiddleware(thunk))

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </BrowserRouter>
    </Provider>
)


ReactDOM.render(app,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
