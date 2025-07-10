import React from "react";
import classes from "./delete.module.css";
import { inter } from "@/app/fonts";
const DeleteBtn = ({ deletepage }) => {
  //sss
  return (
    <button className={`${inter.className} ${classes["delete-btn"]}`} onClick={deletepage}>
      Delete
    </button>
  );
};

export default DeleteBtn;
