import React from "react";
import classes from "./page.module.css";
import Social from "../ui/settings/social/Social";
import ChangePassword from "../ui/settings/changePassword/ChangePassword";
import { inter } from "../fonts";
import { getData } from "../lib/tabelsPages";
import { cookies } from "next/headers";

const page = async () => {
  const socialData = (await getData("social")) || null;
  const cookieStore = cookies();
  const userData = JSON.parse(cookieStore.get("user")?.value) || null;
  console.log("userData", userData);
  // const userData = await getData("users") || null;
  return (
    <div className={classes["page"]}>
      <h2 className={`${inter.className} ${classes["title"]}`}> Settings</h2>
      <div className={classes["settings-items"]}>
        <Social socialData={socialData} />
        <ChangePassword userData={userData} />
      </div>
    </div>
  );
};

export default page;
