import React, { useState } from "react";
//import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    
    //const history = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post(
            "http://localhost:5000/api/auth/login",
            {
            email,
            password,
            }
        );
        localStorage.setItem("token", response.data.token);
        //history.push("/dashboard");
        } catch (error) {
        setLoginError(error.response.data.error);
        }
    };
    
    return (
        <div className="rectangle-parent">
        <div className="frame-child" />
        <form onSubmit={handleSubmit}>
        <Link to={!loginError && "/textToSpeech"}>
        <div className="button">
          <div className="button-child">
          <div className="lets-go" onClick={handleSubmit}>Lets Go!!</div>
          </div>
        </div>
        </Link>
        <b className="signup-login">Signup / Login</b>
        <div className="frame-parent">
          <div className="frame-group">
            <div className="your-email-id-wrapper">
              <div className="your-email-id">Your Email id</div>
            </div>
            <input className="frame-item"
              id = "email-id"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="frame-group">
            <div className="your-email-id-wrapper">
              <div className="your-email-id">Password</div>
            </div>
            <input
                id="password"
                type="password"
                className="frame-item"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
          </div>
          {loginError && <p className="error">{loginError}</p>}
        </div>
        </form>
      </div>
    );
    };

    export default LoginForm;