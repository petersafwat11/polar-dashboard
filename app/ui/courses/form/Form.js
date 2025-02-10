"use client";
import React, { useState, useCallback, memo } from "react";
import classes from "./form.module.css";
import CourseCategory from "../course-category/CourseCategory";
import InputGroup from "../../settings/inputGroup/InputGroup";
import { inter } from "@/app/fonts";
import SaveBtn from "../../saveBtn/SaveBtn";
import DeleteBtn from "../../deleteBtn/DeleteBtn";
import { deleteItem, saveItem } from "@/app/lib/createPages";
import { usePathname, useRouter } from "next/navigation";
const TextArea = memo(
  ({ label, field, placeholder, formData, setFormData }) => {
    const handleInputChange = (field, value) => {
      setFormData({ ...formData, [field]: value });
    };

    return (
      <div className={classes[label.toLowerCase().replace(" ", "-")]}>
        <h3 className={classes["title"]}>{label}</h3>

        <textarea
          placeholder={placeholder}
          className={`${inter.className} ${classes["text-area"]}`}
          value={formData[field]}
          onChange={(e) => {
            handleInputChange(field, e.target.value);
          }}
        />
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

const Form = () => {
  const pathname = usePathname();
  const router = useRouter();
  const defaultData = {
    courseCategory: "",
    packageName: "",
    packageDescription: "",
    packagePrice: "",
    x: "",

  };
  const [formData, setFormData] = useState(defaultData);

  const deletepage = async () => {
    deleteItem(pathname, router, "courses");
  };
  const saveChanges = () => {
    saveItem(pathname, formData, setFormData, defaultData, router, "courses");
  };

  return (
    <div className={`${inter.className} ${classes["container"]}`}>
      <div className={classes["first"]}>
        <div className={classes["category"]}>
          <CourseCategory data={formData} setData={setFormData} />
        </div>

        <TextArea
          label="Package Name"
          field="packageName"
          placeholder="Enter Package Name"
          formData={formData}
          setFormData={setFormData}
        />

        <TextArea
          label="Package Description"
          field="packageDescription"
          placeholder="Enter Package Description"
          formData={formData}
          setFormData={setFormData}
        />
      </div>

      <div className={classes["second"]}>
        <div className={classes["package-price"]}>
          <InputGroup
            placeHolder="Please enter the Package Price"
            id="packagePrice"
            type="text"
            label="Package Price"
            data={formData}
            dataKey="packagePrice"
            setData={setFormData}
          />
        </div>

        <div className={classes["actions"]}>
          <SaveBtn saveChanges={saveChanges} />
          <DeleteBtn deletepage={deletepage} />
        </div>
      </div>

    </div>
  );
};

export default Form;
