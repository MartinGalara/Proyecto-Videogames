import React from "react";
import { Link } from "react-router-dom";
import s from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={s.landing}>
      <h1>Welcome to Henry Videogames</h1>
      <Link to={"/home"}>
        <button className={s.myButton}>Start</button>
      </Link>
    </div>
  );
}
