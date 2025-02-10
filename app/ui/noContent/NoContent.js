import React from "react";
import classes from "./noContent.module.css"; 
import { inter } from "@/app/fonts";
const NoContent = () => {
  return (
    <p className={`${inter.className} ${classes["no-content"]}`}>
      you have not added any content yet{" "}
    </p>
  );
};

export default NoContent;
