import React from "react";
import { BiSearch } from "react-icons/bi";
import Checkbox from "../../checkbox/Checkbox";
import EditButton from "../../editButton/EditButton";
import NoContent from "../../noContent/NoContent";
import Paginations from "../../paginations/Paginations";
import classes from "./table.module.css";
import { inter } from "@/app/fonts";
const Table = ({ data, selectElement, paginations }) => {
  return (
    <div className={`${inter.className} ${classes["table"]}`}>
      <div className={classes["search-wrapper"]}>
        <input className={classes["search"]} type="text" placeholder="Search" />
        <BiSearch className={classes["search-icon"]} />
      </div>

      <div className={classes["table-header"]}>
        <span className={classes["square"]}></span>
        <p className={classes["table-cell"]}> ID</p>
        <p className={classes["table-cell"]}>Full Name</p>
        <p className={classes["table-cell"]}>Roles</p>
        <p className={classes["table-cell"]}>Review Description</p>
        <p className={classes["table-cell"]}>Action </p>
      </div>
      {data?.length > 0 ? (
        data.map((item, index) => (
          <div key={item._id} className={classes["table-row"]}>
            <Checkbox selectElement={selectElement} id={item._id} />
            <p className={classes["table-cell"]}>{index + 1}</p>
            <p className={classes["table-cell"]}>{item.fullName}</p>
            <p className={classes["table-cell"]}>{item.role}</p>
            <p className={classes["description-cell"]}>{item.description}</p>
            <p className={classes["table-cell"]}>{item.packagePrice}</p>
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
