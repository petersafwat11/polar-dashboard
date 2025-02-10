import React from "react";
import classes from "./saveBtn.module.css";
import { inter } from "@/app/fonts";
const SaveBtn = ({ saveChanges }) => {
  return (
    <button className={`${inter.className} ${classes["save-btn"]}`} onClick={saveChanges}>
      Save
    </button>
  );
};


export default SaveBtn;
