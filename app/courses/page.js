import React from "react";
import classes from "./page.module.css";
import axios from "axios";
import Wrapper from "../ui/courses/wrapper/Wrapper";
const page = async ({ searchParams }) => {
  const page = searchParams?.page || 1;
  const rows = searchParams?.rows || 10;
  const search = searchParams?.search;

  const newsData = await axios.get(`${process.env.BACKEND_SERVER}/news`, {
    params: {
      page: page,
      limit: rows,
      searchValue: search,
      or: ["title"],
    },
  });
  const paginations = {
    results: newsData?.data?.results,
    rowsPerPage: rows,
  };
  return (
    <div className={classes["container"]}>
      dd
      <h1 className={classes["title"]}>Packegs </h1>
      <Wrapper dataFetched={newsData?.data} paginations={paginations} />
    </div>
  );
};

export default page;
