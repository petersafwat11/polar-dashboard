import React from "react";
import classes from "./page.module.css";
import axios from "axios";
import Wrapper from "../ui/testimonial/wrapper/Wrapper";
const page = async (props) => {
  const searchParams = await props.searchParams;

  const page = searchParams?.page || 1;
  const rows = searchParams?.rows || 10;
  const search = searchParams?.search || "";
  let newsData;
  try {
    newsData = await axios.get(`${process.env.BACKEND_SERVER}/testimonials`, {
      params: {
        page: page,
        limit: rows,
        searchValue: search,
        or: [
          "courseCategory",
          "packageName",
          "packageDescription",
          "packagePrice",
        ],
      },
    });
  } catch (err) {}
  const paginations = {
    results: newsData?.data?.results,
    rowsPerPage: rows,
  };
  return (
    <div className={classes["container"]}>
      <h1 className={classes["title"]}>Testimonials </h1>
      <Wrapper dataFetched={newsData?.data} paginations={paginations} />
    </div>

  );
};

export default page;
