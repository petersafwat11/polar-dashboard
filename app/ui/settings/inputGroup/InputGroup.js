import React from "react";
import classes from "./inputGroup.module.css";
const InputGroup = ({
  id,
  label,
  data,
  dataKey,
  setData,
  type,
  handleKeyDown,
  placeHolder,
}) => {

  const handleInputChange = (val) => {
    setData({ ...data, [dataKey]: val });
  };
  return (
    <div className={classes["input-group"]}>
      <label htmlFor={id} className={classes["label"]}>
        {label}
      </label>
      <input
        onKeyDown={(e) => {
          handleKeyDown ? handleKeyDown(e) : "";
        }}
        type={type ? type : "text"}
        value={data[dataKey]}
        onChange={(e) => {
          handleInputChange(e.target.value);
        }}
        placeholder={placeHolder ? placeHolder : ""}
        id={id}
        className={classes["input"]}
      ></input>
    </div>
  );
};

export default InputGroup;
