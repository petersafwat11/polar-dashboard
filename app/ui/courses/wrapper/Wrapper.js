"use client";
import { usePathname, useRouter } from "next/navigation";
import Table from "../table/Table";
import classes from "./wrapper.module.css";

import React, { useEffect, useState } from "react";
import DeleteAlert from "../../deleteAlert/DeleteAlert";
import { checkboxClicked, createItem, deleteItem } from "@/app/lib/tabelsPages";
import Popup from "../../popupWrapper/Popup";
import ActionsButtons from "../../actionsButtons/ActionsButtons";

const Wrapper = ({ dataFetched, paginations }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [tabeleData, setTableData] = useState(dataFetched?.data?.data || []);
  const [selectedItems, setSelectedItems] = useState([]);
  const [deleteAlert, setDeleteAlert] = useState(false);

  const selectElement = (elemID) => {
    checkboxClicked(elemID, selectedItems, setSelectedItems);
  };

  const createNews = () => {
    createItem(pathname, router);
  };

  const deleteNews = () => {
    deleteItem(news, selectedItems, setNews, setSelectedItems, "news");
    toggleDeleteAlert();
  };
  const toggleDeleteAlert = () => {
    if (selectedItems?.length > 0) {
      setDeleteAlert(!deleteAlert);
    } else {
      // notify
      console.log("you have not selected any item to delete", "warning");
    }
  };
  useEffect(() => {
    setNews(dataFetched?.data?.data || []);
  }, [dataFetched]);
  return (
    <div className={classes["container"]}>
      {deleteAlert && (
        <Popup>
          <DeleteAlert cancelFunc={toggleDeleteAlert} deleteFunc={deleteNews} />
        </Popup>
      )}

      <div className={classes["actions"]}>
        <ActionsButtons
          firstButtonFunction={createNews}
          secondButtonFunction={toggleDeleteAlert}
          first={"Create Listing"}
          second={"Delete"}
        />
      </div>
      <Table
        data={tabeleData}
        selectElement={selectElement}
        paginations={paginations}
      />
    </div>
  );
};

export default Wrapper;
