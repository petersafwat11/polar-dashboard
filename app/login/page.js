import React from "react";
import classes from "./page.module.css";
import LoginForm from "../ui/loginForm/LoginForm";

const Login = async () => {
  return (
    <div className={classes["page"]}>
      {/* <div className={classes["logo-wrapper"]}> */}
      {/* <p className={classes["logo"]}> Quoturl</p> */}

      {/* <Image alt="logo" src="/svg/logo-login.svg" width="59" height="38" /> */}
      {/* <h1 className={classes["title"]}>Log In</h1> */}
      {/* </div> */}
      <LoginForm />
    </div>
  );
};

export default Login;
