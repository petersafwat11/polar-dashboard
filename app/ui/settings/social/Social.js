"use client";
import React, { useState } from "react";
import classes from "./social.module.css";
import InputGroup from "../inputGroup/InputGroup";
import { inter } from "@/app/fonts";
import SaveBtn from "../../saveBtn/SaveBtn";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

const Social = ({ socialData }) => {
  const defaultData = {
    facebook: "",
    twitter: "",
    instagram: "",
  };
  const [data, setData] = useState(
    socialData?.data && socialData?.data.length > 0
      ? socialData?.data[0]
      : defaultData
  );

  const handleSubmit = async () => {
    console.log(
      "data",
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/social/${socialData.data[0]?._id}`
    );
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/social/${socialData.data[0]?._id}`,
        data
        // {
        //   headers: {
        //     Authorization: `Bearer ${Cookies.get("token")}`,
        //   },
        // }
      );
      console.log("response", response);
      toast.success("Social media links updated successfully!");
    } catch (error) {
      toast.error("Failed to update social media links");
      console.error(error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className={`${inter.className} ${classes["container"]}`}>
      <Toaster position="top-center" reverseOrder={false} />
      <h3 className={classes["title"]}>Edit social media links</h3>
      <div className={classes["links"]}>
        <InputGroup
          placeHolder={"Enter facebook link"}
          handleKeyDown={handleKeyDown}
          id={"facebook"}
          type={"text"}
          label={"Facebook Link"}
          data={data}
          dataKey={"facebook"}
          setData={setData}
        />
        <InputGroup
          placeHolder={"Enter twitter link"}
          handleKeyDown={handleKeyDown}
          id={"twitter"}
          type={"text"}
          label={"Twitter Link"}
          data={data}
          dataKey={"twitter"}
          setData={setData}
        />
        <InputGroup
          placeHolder={"Enter instagram link"}
          handleKeyDown={handleKeyDown}
          id={"instagram"}
          type={"text"}
          label={"Instagram Link"}
          data={data}
          dataKey={"instagram"}
          setData={setData}
        />
      </div>
      <div className={classes["btn"]}>
        <SaveBtn saveChanges={handleSubmit} />
      </div>
    </div>
  );
};

export default Social;
