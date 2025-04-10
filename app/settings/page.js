import React from "react";
import classes from "./page.module.css";
import Social from "../ui/settings/social/Social";
import ChangePassword from "../ui/settings/changePassword/ChangePassword";
import { inter } from "../fonts";
import axios from "axios";
const page = async () => {
  let socialData;
  try {
    socialData = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/social`
    );
  } catch (err) {
    console.log("err", err);
  }

  return (
    <div className={classes["page"]}>
      <h2 className={`${inter.className} ${classes["title"]}`}> Settings</h2>
      <div className={classes["settings-items"]}>
        <Social socialData={socialData?.data?.data} />
        <ChangePassword />
      </div>
    </div>
  );
};

export default page;
