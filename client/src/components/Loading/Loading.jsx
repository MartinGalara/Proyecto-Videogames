import React from "react";
import s from "./Loading.module.css";

export default function Loading() {
  
    return (
        <img className={s.loading} src="https://i.pinimg.com/originals/3d/80/64/3d8064758e54ec662e076b6ca54aa90e.gif" alt="not found" />
    );
  }