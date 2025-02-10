import React from "react";
import classes from "./page.module.css";
import Form from "@/app/ui/courses/form/Form";
const page = () => {
  return (
    <div className={classes["page"]}>
      <Form />
    </div>
  );
};

export default page;
