import "./loginpage.css";
import Header from "../../components/Header";
import LoginForm from "./loginform";

const LoginPage = () => {
  return (
    <div className="apple-vision-pro-ui">
      <img className="background-icon" alt="" src="./images/Background.png" />
      <Header/>
      <LoginForm/>
      <div className="group-parent">
        <img className="group-icon" alt="" src="./images/Group.png" />
        <b className="welcome-to">Welcome to</b>
        <b className="welcome-to">Goodspace Communications</b>
      </div>
    </div>
  );
};

export default LoginPage;