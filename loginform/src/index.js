import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";

import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../src/redux/UserSlice.js"


const root = ReactDOM.createRoot(document.getElementById('root'));

const store= configureStore({
  reducer:userReducer
})
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

