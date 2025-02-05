import React from "react";
import classes from "./sideNav.module.css";
import LikeIcon from "./LikeIcon";
import CoursesIcon from "./CoursesIcon";
import PaymentIcon from "./PaymentIcon";
import Image from "next/image";
import HomeIcon from "./HomeIcon";
import SettingsIcon from "./SettingsIcon";
import { inter } from "@/app/fonts";
import Link from "next/link";
const SideNav = () => {
  return (
    <div className={`${inter.className} ${classes["nav"]}`}>
      <Image src="/svg/logo.svg" width="249" height="101" alt="logo" />
      <div className={classes["nav-items"]}>
        <Link href={"/"} className={classes["nav-item"]}>
          <HomeIcon className={classes["nav-icon"]} />{" "}
          <p className={classes["nav-page"]}>Dashboard</p>
        </Link>
        <Link href={"/courses"} className={classes["nav-item"]}>
          <CoursesIcon className={classes["nav-icon"]} />{" "}
          <p className={classes["nav-page"]}>Courses</p>
        </Link>
        <Link href={"/testimonials"} className={classes["nav-item"]}>
          <LikeIcon className={classes["nav-icon"]} />{" "}
          <p className={classes["nav-page"]}>Testimonials</p>
        </Link>
        <Link href={"/payment"} className={classes["nav-item"]}>
          <PaymentIcon className={classes["nav-icon"]} />{" "}
          <p className={classes["nav-page"]}>Payment</p>
        </Link>
        <Link href={"/settings"} className={classes["nav-item"]}>
          <SettingsIcon className={classes["nav-icon"]} />{" "}
          <p className={classes["nav-page"]}>Settings</p>
        </Link>
      </div>
    </div>
  );
};

export default SideNav;
