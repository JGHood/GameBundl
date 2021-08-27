import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { NavLink, useHistory } from "react-router-dom";

import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import "../styles/login-page-style.css";

const required = (value) => { //insures both fields have a value
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const LoginPage = () => {
    const form = useRef();
    const buttonCheck = useRef();
    const history = useHistory();

    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");


    const onChangeUsername = (e) => {
        const usernameOrEmail = e.target.value;
        setUsernameOrEmail(usernameOrEmail);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (buttonCheck.current.context._errors.length === 0) { //checks submit errors from validation
            AuthService.login(usernameOrEmail, password).then(
                () => {
                    UserService.getUser().then(() => {
                        history.push("/dashboard"); //uses useHistory to push a redirect on successful login
                        window.location.reload(); //reloads on success)
                    })
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    console.log(error);
                    if (error.message != "Network Error") {
                        setMessage("No account with that username or password was found. Try again")
                    }
                    else {
                        setMessage(resMessage); //else sets display message to reason why failed
                    }

                }
            );
        } else {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="fade-in">
                <h1 className="login-header">Login to GameBundl</h1>
                <div className="card card-container">

                    <Form onSubmit={handleLogin} ref={form}>
                        <div className="form-group">
                            <label htmlFor="usernameOrEmail">Username or Email</label>
                            <Input
                                type="text"
                                className="form-control login-form-section"
                                name="usernameOrEmail"
                                value={usernameOrEmail}
                                onChange={onChangeUsername}
                                validations={[required]}
                                placeholder={"Enter your Username or Email"}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Input
                                type="password"
                                className="form-control login-form-section"
                                name="password"
                                value={password}
                                onChange={onChangePassword}
                                validations={[required]}
                                placeholder="Enter Your Password"
                            />
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary btn-block login-submit-btn" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Login</span>
                            </button>
                        </div>

                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <CheckButton style={{ display: "none" }} ref={buttonCheck} />
                    </Form>
                </div>
                <div className="start-bundling">
                    <div className="no-account-text">Don't have an account yet?</div>
                    <button className="btn btn-secondary sign-up-btn"><NavLink className="login-nav-link" activeClassName="active" to='/signup'>Sign Up Here</NavLink></button>
                </div>
            </div>
        </div>
    );
};
export default LoginPage;