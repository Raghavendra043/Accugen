import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import React from 'react';
import HomePage from "./components/home";
import Order_form from "./components/order_forms/order_form";
import Products from "./components/products";
import Products_item from "./components/products_item";
import AuthPage from "./components/login";
import PrivateRoute from "./privateRoute";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Profile from "./components/profile";
import Accgen_advantage from "./components/accugen_adv";
import ApproveAccount from "./approve";
import OrdersPage from "./components/account/orders";
import Dashboard from "./components/account";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <div>
          <Navbar/>
              <HomePage/>
              <Footer/>
            </div>
      },
      {
        path: "/auth/:method",
        element: <div>
          <Navbar/>
              <AuthPage/>
              <Footer/>
            </div>
      },
      {
        path: "/order_form/:product",
        element: <PrivateRoute>
          <Navbar/>
              <Order_form/>
              <Footer/>
            </PrivateRoute>
      },
      {
        path: "/products/:type",
        element: <div>
          <Navbar/>
              <Products/>
              <Footer/>
            </div>
      },
      {
        path: "/products/:type/:item",
        element: (<>
          <Navbar/>
              <Products_item/>
              <Footer/>
            </>)
      },
      {
        path: "/MyACCUGEN",
        element: (<PrivateRoute>
          <Navbar/>
              <Profile/>
              <Footer/>
            </PrivateRoute>)
      },
      {
        path: "/accugen_advantage",
        element: (<>
          <Navbar/>
              <Accgen_advantage/>
              <Footer/>
            </>)
      },
      {
        path: "/approveaccount/:data",
        element: (<>
          <Navbar/>
              <ApproveAccount/>
              <Footer/>
            </>)
      },
      {
        path: "/account/:type",
        element: (<PrivateRoute>
          <Navbar/>
              <Dashboard/>
              <Footer/>
            </PrivateRoute>)
      },
    ]
  }
]);

export default router;
