import React, { useState } from "react";
import s from "./SearchBar.module.css";

export default function SearchBar({ searchHandler }) {
  const [videogame, setVideogame] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        searchHandler(videogame);
        setVideogame("");
      }}
    >
      <input
        className={s.searchBar}
        type="text"
        placeholder="Type a videogame..."
        value={videogame}
        onChange={(e) => setVideogame(e.target.value)}
      />
      <input className={s.button} type="submit" value="Search" />
    </form>
  );
}
