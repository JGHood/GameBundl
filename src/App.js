import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import SplashPage from "./pages/splash-page";
import NavigationBar from "./components/navigation-bar";
import LoginPage from "./pages/login-page";
import SignupPage from "./pages/signup-page";
import InventoryPage from "./pages/inventory-page";
import UnauthorizedPage from "./pages/unauthorized-page";
import PageNotFound from "./pages/PageNotFound";
import BundlesPage from "./pages/bundles-page";
import TestPage from "./pages/test-page";
export default function App() {


  function UnauthenticatedRoute({ component: Component, ...rest }) {
    return (
      <Route {...rest} render={(props => {
        const role = localStorage.getItem('jwt');
        if (role === null) {
          return <Redirect to='/login' />
        }
        else {
          return  <Component {...props} />
        }
      })}
      />
    );
  }

  return (
    <Router>
      <div>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={SplashPage}/>
          <UnauthenticatedRoute exact path="/dashboard" component={InventoryPage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/signup" component={SignupPage}/>
          <Route path="/unauthorized" component={UnauthorizedPage}/>
          <UnauthenticatedRoute path="/bundles" component={BundlesPage}/>
          <Route path="/test" component={TestPage}/>
          <Route path="/" component={PageNotFound}/>
        </Switch>
      </div>
    </Router>
  );
}
