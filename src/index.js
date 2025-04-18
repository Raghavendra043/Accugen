import React from 'react';
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from './Route.js';
import AuthProvider from './Firebase/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

