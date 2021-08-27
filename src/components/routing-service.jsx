import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SplashPage from "../pages/splash-page";
import NavigationBar from "./navigation-bar";
import LoginPage from "../pages/login-page";
import SignupPage from "../pages/signup-page";
import InventoryPage from "../pages/inventory-page";
import UnauthorizedPage from "../pages/unauthorized-page";


export default function RoutingService() {
  return (
    <Router>
      <div>
          <NavigationBar/>
        <Switch>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Dashboard() {
  return (
    <div>
      <InventoryPage/>
    </div>
  );
}
