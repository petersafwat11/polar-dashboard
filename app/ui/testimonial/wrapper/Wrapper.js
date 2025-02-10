"use client";
import { usePathname, useRouter } from "next/navigation";
import Table from "../table/Table";
import classes from "./wrapper.module.css";
import React, { useEffect, useState } from "react";
import DeleteAlert from "../../deleteAlert/DeleteAlert";
import { checkboxClicked, createItem, deleteItem } from "@/app/lib/tabelsPages";
import Popup from "../../popupWrapper/Popup";
import ActionsButtons from "../../actionsButtons/ActionsButtons";
import { Toaster, toast } from "react-hot-toast";

const Wrapper = ({ dataFetched, paginations }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [tableData, setTableData] = useState(dataFetched?.data?.data || []);
  const [selectedItems, setSelectedItems] = useState([]);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const selectElement = (elemID) => {
    checkboxClicked(elemID, selectedItems, setSelectedItems);
  };

  const createTestimonial = async () => {
    setIsLoading(true);
    try {
      await createItem(pathname, router);
    } catch (error) {
      toast.error("Failed to create testimonial");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTestimonials = async () => {
    setIsLoading(true);
    try {
      await deleteItem(
        tableData,
        selectedItems,
        setTableData,
        setSelectedItems,
        "testimonials"
      );
      toast.success("Testimonials deleted successfully");
    } catch (error) {
      toast.error("Failed to delete testimonials");
    } finally {
      setIsLoading(false);
      toggleDeleteAlert();
    }
  };

  const toggleDeleteAlert = () => {
    if (selectedItems?.length > 0) {
      setDeleteAlert(!deleteAlert);
    } else {
      toast.error("Please select items to delete");
    }
  };

  useEffect(() => {
    setTableData(dataFetched?.data?.data || []);
  }, [dataFetched]);

  return (
    <div className={classes["container"]}>
      <Toaster position="top-center" reverseOrder={false} />
      {deleteAlert && (
        <Popup>
          <DeleteAlert 
            cancelFunc={toggleDeleteAlert} 
            deleteFunc={deleteTestimonials}
            isLoading={isLoading} 
          />
        </Popup>
      )}

      <div className={classes["actions"]}>
        <ActionsButtons
          firstButtonFunction={createTestimonial}
          secondButtonFunction={toggleDeleteAlert}
          first={"Create Testimonial"}
          second={"Delete Selected"}
          disabled={isLoading}
        />
      </div>

      <Table
        data={tableData}
        selectElement={selectElement}
        paginations={paginations}
        selectedItems={selectedItems}
      />
    </div>
  );
};

export default Wrapper;
