import React from "react";
import classes from "./page.module.css";
import { inter } from "@/app/fonts";
import Testimonial from "@/app/ui/testimonial/Testimonial";
const page = () => {
  return (
    <div className={classes["page"]}>
      <h2 className={`${inter.className} ${classes["title"]}`}> Testimonial</h2>
      <div className={classes["settings-items"]}>
        <Testimonial />
      </div>
    </div>
  );
};

export default page;
