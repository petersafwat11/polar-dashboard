import React from "react";
import classes from "./page.module.css";
import Form from "@/app/ui/courses/form/Form";
import { getData } from "@/app/lib/createPages";
const page = async ({ params }) => {
  const { id } = await params;
  let data = null;
  if (id) {
    data = await getData(id, "courses");
  }
  // const course = await getCourseById(params.id);
  return (
    <div className={classes["page"]}>
      <Form data={data} />
    </div>
  );
};

export default page;
