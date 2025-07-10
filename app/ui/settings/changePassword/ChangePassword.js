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
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (data.password !== data.passwordConfirm) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/users/updateMyPassword`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.status === "success") {
        toast.success("Password updated successfully");
        setData({
          passwordCurrent: "",
          password: "",
          passwordConfirm: "",
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Password update failed");
    } finally {
      setLoading(false);
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
          placeHolder={"Enter current password"}
          handleKeyDown={handleKeyDown}
          id={"passwordCurrent"}
          type={"password"}
          label={"Current Password"}
          data={data}
          dataKey={"passwordCurrent"}
          setData={setData}
        />
        <InputGroup
          placeHolder={"Enter new password"}
          handleKeyDown={handleKeyDown}
          id={"password"}
          type={"password"}
          label={"New Password"}
          data={data}
          dataKey={"password"}
          setData={setData}
        />
        <InputGroup
          placeHolder={"Confirm new password"}
          handleKeyDown={handleKeyDown}
          id={"passwordConfirm"}
          type={"password"}
          label={"Confirm New Password"}
          data={data}
          dataKey={"passwordConfirm"}
          setData={setData}
        />
      </div>
      <div className={classes["btn"]}>
        <SaveBtn saveChanges={handleSubmit} disabled={loading} />
      </div>
    </div>
  );
};

export default ChangePassword;
