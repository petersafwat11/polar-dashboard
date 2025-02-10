"use client";
import React, { useState } from "react";
import classes from "./changePassword.module.css";
import { inter } from "@/app/fonts";
import InputGroup from "../inputGroup/InputGroup";
import SaveBtn from "../../saveBtn/SaveBtn";
const ChangePassword = () => {
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const handleSubmit = () => {};
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className={`${inter.className} ${classes["container"]}`}>
      <h3 className={classes["title"]}>Change login password</h3>
      <div className={classes["passwords"]}>
        <InputGroup
          placeHolder={"Enter old Password"}
          handleKeyDown={handleKeyDown}
          id={"oldPassword"}
          type={"password"}
          label={"Old Password"}
          data={data}
          dataKey={"oldPassword"}
          setData={setData}
        />
        <InputGroup
          placeHolder={"Enter new Password"}
          handleKeyDown={handleKeyDown}
          id={"newPassword"}
          type={"password"}
          label={"New Password"}
          data={data}
          dataKey={"newPassword"}
          setData={setData}
        />
      </div>
      <div className={classes["btn"]}>
        <SaveBtn />
      </div>
    </div>
  );
};

export default ChangePassword;
