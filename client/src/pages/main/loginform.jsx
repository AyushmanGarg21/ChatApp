import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";


const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //https://chatapp-server-scrs.onrender.com
    fetch("https://chatapp-server-scrs.onrender.com/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          const socket = socketIOClient("https://chatapp-server-scrs.onrender.com",{
            path: "/api/socket.io"
          });
          // Emit the 'userLoggedIn' event to the server
          props.setSocket(socket);
          props.setUser(email);
          socket.emit("userLoggedIn", { email });
          navigate('/textToSpeech');
        } else {
          console.log(response);
          if(response.status === 401){
            alert("Invalid password")
          }else{
            alert("Error: " + response.statusText);
          }
        }
      });
  };

  return (
    <div className="rectangle-parent">
      <div className="frame-child" />
      <form onSubmit={handleSubmit}>
      <div className="button">
            <div className="button-child">
              <div className="lets-go" onClick={handleSubmit}>
                Lets Go!!
              </div>
            </div>
        </div>
        <b className="signup-login">Signup / Login</b>
        <div className="frame-parent">
          <div className="frame-group">
            <div className="your-email-id-wrapper">
              <div className="your-email-id">Your Email id</div>
            </div>
            <input
              className="frame-item"
              id="email-id"
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
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
