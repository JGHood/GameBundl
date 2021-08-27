import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useHistory } from "react-router-dom";

import AuthService from "../services/auth.service";
import "../styles/sign-up-page-style.css";

const required = (value) => { //ensures both fields have a value
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const SignupPage = () => {
    const form = useRef();
    const buttonCheck = useRef();
    const history = useHistory();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");


    const onChangeFirstName = (e) => {
        const firstName = e.target.value;
        setFirstName(firstName);
    };

    const onChangeLastName = (e) => {
        const lastName = e.target.value;
        setLastName(lastName);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
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
            AuthService.signup(firstName, lastName, username, email, password).then(
                () => {

                    history.push("/login");
                    window.location.reload(); //reloads on success
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(error.response.data.message);
                    setLoading(false);
                    console.log(error);

                }
            );
        } else {
            setLoading(false);
        }
    };

    return (
        <div className="signup-page">
            <div className="fade-in">
                <h1 className="signup-header">Sign Up and Start Bundling</h1>
                <div className="card card-container">

                    <Form onSubmit={handleLogin} ref={form}>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <Input
                                type="text"
                                className="form-control login-form-section"
                                name="firstName"
                                value={firstName}
                                placeholder="Your First Name"
                                onChange={onChangeFirstName}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <Input
                                type="text"
                                className="form-control login-form-section"
                                name="lastName"
                                value={lastName}
                                placeholder="Your Last Name"
                                onChange={onChangeLastName}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Input
                                type="email"
                                className="form-control login-form-section"
                                name="email"
                                value={email}
                                placeholder="Your Email"
                                onChange={onChangeEmail}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Input
                                type="text"
                                className="form-control login-form-section"
                                name="username"
                                value={username}
                                placeholder="Create a Username"
                                onChange={onChangeUsername}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Input
                                type="password"
                                className="form-control login-form-section"
                                name="password"
                                value={password}
                                placeholder="Create a Password"
                                onChange={onChangePassword}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary btn-block login-submit-btn" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Sign Up</span>
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
            </div>
        </div>
    );
};
export default SignupPage;