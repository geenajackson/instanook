import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./components/Home"
import Logout from "./components/Logout";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";

function Routes({ loginUser, logoutUser, registerUser }) {
    return (
        <Switch>
            <Route path="/login">
                <LoginForm loginUser={loginUser} />
            </Route>
            <Route exact path="/signup">
                <SignupForm registerUser={registerUser} />
            </Route>
            <Route exact path="/logout">
                <Logout logoutUser={logoutUser} />
            </Route>
            <Route path="/">
                <Home />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}

export default Routes;