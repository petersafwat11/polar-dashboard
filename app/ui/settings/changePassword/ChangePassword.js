"use client";
import React, { useState } from "react";
import classes from "./changePassword.module.css";
import { inter } from "@/app/fonts";
import InputGroup from "../inputGroup/InputGroup";
import SaveBtn from "../../saveBtn/SaveBtn";
import axios from "axios";
import { toast } from "react-hot-toast";
const ChangePassword = ({ userData }) => {
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const handleSubmit = async () => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/users/updateMyPassword`,
        { id: userData._id, currentPassword: data.oldPassword, password: data.newPassword }
      );
      toast.success("Password updated successfully");
      setData({
        oldPassword: "",
        newPassword: "",
      });
      console.log("response", response);
    } catch (error) {
      toast.error("Password update failed");
      console.log("error", error);
    } 
  };
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
        <SaveBtn saveChanges={handleSubmit} />
      </div>
    </div>
  );
};

export default ChangePassword;
