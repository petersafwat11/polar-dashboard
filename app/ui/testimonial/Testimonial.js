"use client";
import React, { useState } from "react";
import classes from "./testimonial.module.css";
import { inter } from "@/app/fonts";
import SaveBtn from "../saveBtn/SaveBtn";
import InputGroup from "../settings/inputGroup/InputGroup";
import { saveItem } from "@/app/lib/createPages";
import { usePathname, useRouter } from "next/navigation";
const Testimonial = () => {
  const pathname = usePathname();
  const router = useRouter();
  const defaultData = { 
    fullName: "",
    role: "",
    description: "",
  };
  const [data, setData] = useState(defaultData);

  const handleSubmit = () => {};
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  const saveChanges = () => {
    saveItem(pathname, data, setData, defaultData, router, "testimonials");
  };



  return (
    <div className={`${inter.className} ${classes["container"]}`}>
      <h3 className={classes["title"]}>{true ? "Add" : "Edit"} Testimonial</h3>
      <div className={classes["data"]}>
        <div className={classes["inputs"]}>
          <div className={classes["input-wrapper"]}>
            <InputGroup
              placeHolder={"Enter Your Fullname"}
              handleKeyDown={handleKeyDown}
              id={"fullName"}
              type={"text"}
              label={"Full Name"}
              data={data}
              dataKey={"fullName"}
              setData={setData}
            />
          </div>
          <div className={classes["input-wrapper"]}>
            <InputGroup
              placeHolder={"Enter Your Role"}
              handleKeyDown={handleKeyDown}
              id={"role"}
              type={"text"}
              label={"Role"}
              data={data}
              dataKey={"role"}
              setData={setData}
            />
          </div>
        </div>
        <div className={classes["textarea-wrapper"]}>
        <textarea
            placeholder={"Enter Your review"}
            className={`${inter.className} ${classes["text-area"]}`}
            value={data.description}
            onChange={(e) => {
              setData({ ...data, description: e.target.value });
            }}

        />
        </div>
      </div>
      <div className={classes["btn"]}>
        <SaveBtn saveChanges={saveChanges} />
      </div>
    </div>
  );
};

export default Testimonial;
