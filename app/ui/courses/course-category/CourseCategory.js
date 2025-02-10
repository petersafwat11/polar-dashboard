import classes from "./courseCategory.module.css";
import { inter } from "@/app/fonts";
const CourseCategory = ({ data, setData }) => {
  const categories = ["Forex", "Crypto", "Stocks"];
  return (
    <div className={`${inter.className} ${classes["sport-category"]}`}>
      <h2 className={classes["title"]}> Category</h2>
      <div className={classes["categories"]}>
        {categories.map((item, index) => (
          <div
            onClick={() => {
              setData({
                ...data,
                courseCategory: item.toLocaleLowerCase(),
                // type: "SPORT-CATEGORY",
                // value: item.toLocaleLowerCase(),
              });
            }}
            key={index}
            className={classes["category"]}
          >
            <p>{item}</p>
            <span
              className={
                classes[
                  data.courseCategory == item.toLocaleLowerCase()
                    ? "checked"
                    : "not-checked"
                ]
              }
            ></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCategory;
