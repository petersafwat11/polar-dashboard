import classes from "./courseCategory.module.css";
import { inter } from "@/app/fonts";

const CourseCategory = ({ data, setData }) => {
  const categories = [
    "Forex",
    "Crypto",
    "Indecies/Futures",
    "Bots",
    "Software",
  ];

  return (
    <div className={`${inter.className} ${classes["sport-category"]}`}>
      <h2 className={classes["title"]}>Category</h2>
      <div className={classes["categories"]}>
        {categories.map((item, index) => (
          <div
            onClick={() => {
              setData({
                courseCategory: item.toLowerCase(),
              });
            }}
            key={index}
            className={classes["category"]}
          >
            <p>{item}</p>
            <span
              className={
                classes[
                  data.courseCategory === item.toLowerCase()
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
