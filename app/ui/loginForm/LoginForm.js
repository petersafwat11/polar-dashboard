"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import classes from "./loginForm.module.css";
import InputGroup from "../inputGroup/InputGroup";
import { roboto_condensed } from "@/app/fonts";
import { toast, Toaster } from "react-hot-toast"; // Add toast notifications

const LoginForm = () => {
  const router = useRouter();
  const [data, setData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const validateInputs = () => {
    if (!data.email || !data.password) {
      toast.error("Please enter both email and password");
      return false;
    }
    if (!data.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (data.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/users/login`,
        data
      );

      // Store token in cookie
      Cookies.set("jwt", response.data.token, {
        expires: 1,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax", // Changed from "strict" to "Lax"
      });

      // Store user data
      Cookies.set("user", JSON.stringify(response.data.data.user), {
        expires: 1,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
      });

      toast.success("Login successful!");
      // Add a slight delay before redirect
      setTimeout(() => {
        router.push("/");
        router.refresh(); // Force a refresh of the page
      }, 1000);
    } catch (error) {
      console.log("error", error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !isLoading) {
      handleSubmit();
    }
  };

  return (
    <div className={`${roboto_condensed.className} ${classes["container"]}`}>
      <Toaster position="top-center" />
      <div className={classes["form"]}>
        <h1 className={classes["title"]}>Log In</h1>

        <InputGroup
          placeHolder={"Enter your email"}
          handleKeyDown={handleKeyDown}
          id={"email"}
          type={"email"}
          label={"Email Address"}
          data={data}
          dataKey={"email"}
          setData={setData}
          disabled={isLoading}
          required
        />
        <InputGroup
          handleKeyDown={handleKeyDown}
          type={"password"}
          id={"password"}
          label={"Password"}
          data={data}
          dataKey={"password"}
          setData={setData}
          placeHolder={"Enter your password"}
          disabled={isLoading}
          required
        />

        <button
          onClick={handleSubmit}
          className={classes["login-button"]}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
