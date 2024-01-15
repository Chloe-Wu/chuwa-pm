import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import { Provider } from "react-redux";
import {store, persistor} from "./slices/store.jsx";
import { PersistGate } from 'redux-persist/es/integration/react.js';
import { jwtDecode } from "jwt-decode";
// import { setCurrentUser } from './slices/userSlice.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

// if (localStorage.getItem('token')) {
//   store.dispatch(setCurrentUser(jwtDecode(localStorage.getItem('token'))));
// }

root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
         <App />
      </PersistGate>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();