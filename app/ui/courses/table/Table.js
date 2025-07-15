import React from "react";
import { BiSearch } from "react-icons/bi";
import Checkbox from "../../checkbox/Checkbox";
import EditButton from "../../editButton/EditButton";
import NoContent from "../../noContent/NoContent";
import Paginations from "../../paginations/Paginations";
import classes from "./table.module.css";
import { convertDate } from "@/app/lib/datesFucntions";
import { inter } from "@/app/fonts";
import Search from "../../search/Search";

const Table = ({ data, selectElement, paginations }) => {
  return (
    <div className={`${inter.className} ${classes["table"]}`}>
      <div className={classes["search-wrapper"]}>
        <Search />
      </div>
      <div className={classes["table-header"]}>
        <span className={classes["square"]}></span>
        <p className={classes["table-cell"]}>ID</p>
        <p className={classes["table-cell"]}>Course Title</p>
        <p className={classes["table-cell"]}>Category</p>
        <p className={classes["table-cell"]}>Level</p>
        <p className={classes["table-cell"]}>Price</p>
        <p className={classes["table-cell"]}>Discount</p>
        <p className={classes["table-cell"]}>Reviews</p>
        <p className={classes["table-cell"]}>Action</p>
      </div>
      {data?.length > 0 ? (
        data.map((item, index) => (
          <div key={item._id} className={classes["table-row"]}>
            <Checkbox selectElement={selectElement} id={item._id} />
            <p className={classes["table-cell"]}>{index + 1}</p>
            <p className={classes["table-cell"]}>
              {item.title}
            </p>
            <p className={classes["table-cell"]}>
              {item.category }
            </p>
            <p className={classes["table-cell"]}>{item.level || "Beginner"}</p>
            <p className={classes["table-cell"]}>
              ${item.price ||"0"}
            </p>
            <p className={classes["table-cell"]}>{item.discount || "0"}%</p>
            <p className={classes["table-cell"]}>
              {item.reviews ? item.reviews.length : 0}
            </p>
            <EditButton id={item._id} />
          </div>
        ))
      ) : (
        <NoContent />
      )}

      <Paginations
        rowsPerPage={paginations.rowsPerPage}
        results={paginations.results}
      />
    </div>
  );
};

export default Table;
