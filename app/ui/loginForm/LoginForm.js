"use client";
import axios from "axios";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import classes from "./loginForm.module.css";
import InputGroup from "../inputGroup/InputGroup";
import { roboto_condensed } from "@/app/fonts";

const LoginForm = () => {
  const router = useRouter();
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState({ state: false, message: "" });
  const handleSubmit = async () => {
    try {
      if (data.email.length < 1 || data.password.length < 1) {
        setError({ state: true, message: "Error: you must enter both inputs" });
      }
      const response = await axios.post(
        `${process.env.BACKEND_SERVER}/users/login`,
        { email: data.email, password: data.password }
      );
      console.log("response", response);
      Cookies.set("user", JSON.stringify(response.data.data.user), {
        expires: 1,
      });
      Cookies.set("token", response.data.token, {
        expires: 1,
      });

      router.push("/");
    } catch (error) {
      setError({
        state: true,
        message: "Error: either email or password is incorrect",
      });
      console.log("error", error);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className={`${roboto_condensed.className} ${classes["container"]}`}>
      <div className={classes["form"]}>
        {error.state && <p className={classes["error"]}>{error.message}</p>}
        
        <h1 className={classes["title"]}>Log In</h1>

        <InputGroup
          placeHolder={"Please enter your email"}
          handleKeyDown={handleKeyDown}
          id={"email"}
          type={"email"}
          label={"Username or Email Address"}
          data={data}
          dataKey={"email"}
          setData={setData}
        />
        <InputGroup
          handleKeyDown={handleKeyDown}
          type={"password"}
          id={"password"}
          label={"Password"}
          data={data}
          dataKey={"password"}
          setData={setData}
          placeHolder={"Please enter your Password"}
        />

        <button onClick={handleSubmit} className={classes["login-button"]}>
          Log in
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
