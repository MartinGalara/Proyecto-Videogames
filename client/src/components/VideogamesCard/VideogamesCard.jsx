import React from "react";
import s from "./VideogamesCard.module.css";
import { Link } from "react-router-dom";

export default function VideogameCard({ name, img, genres, id , rating }) {
  return (
    <div className={s.card}>
      <Link to={`/detail/${id}`}>
        <h3>
          {name}
        </h3>
      </Link>
      <h4>Rating: {rating}</h4>
      <h4>Genres: {genres.join(" - ")}</h4>
      <img src={img} alt="img not found" />
    </div>
  );
}
