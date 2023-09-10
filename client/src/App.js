import React from "react";
import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect, useHistory
} from "react-router-dom";
import { useSelector } from "react-redux";



function App() {
  // https://medium.com/@nasir/reset-scroll-position-on-change-of-routes-react-a0bd23093dfe
  const history = useHistory()
  history.listen((location, action) => {
      window.scrollTo(0, 0)
  })

  //check the existence of user information after (success)login
  const user = useSelector(state => state.user.currentUser)
  // console.log("user is: " + user)

  const cart = useSelector(state => state.cart.amount)
  
  // const user  = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)?.currentUser
  return ( 
    <Switch>
      <Route exact path="/">
        {user ? <Home /> : <Redirect to="/login" />}
      </Route>
      <Route path="/products/:category">
        <ProductList />
      </Route>
      <Route path="/product/:id">
        <Product />
      </Route>
      <Route path="/cart">
        <Cart />
      </Route>
      <Route path="/login">
        {user ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route path="/register">
        {user ? <Redirect to="/" /> : <Register />}
      </Route>
      <Route path="/success">
        {cart === 0 ? <Redirect to="/" /> : <Success />}
      </Route>
    </Switch>
    // <Register />
    // <Login />
    // <Home />
    // <ProductList />
    // <Product />
    // <Cart />
  );
}

export default App;
