import React from "react";
import s from "./Home.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVideogames,
  getSomeVideogames,
  getGenres,
  applyFilters,
  setPage,
  setFlag,
} from "../../redux/actions";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import VideogameCard from "../VideogamesCard/VideogamesCard";
import Paginado from "../Paginado/Paginado";
import Loading from "../Loading/Loading";

let flag = false;

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const allGenres = useSelector((state) => state.genres);
  const currentPage = useSelector((state) => state.currentPage)
  const flag2 = useSelector((state) => state.flag)
  const itemsPerPage = 15;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const shownItems = allVideogames.slice(firstIndex, lastIndex);
  const [filtrados, setFiltrados] = useState({
    genre: "All genres",
    origin: "All",
    filter: "No filter",
    flag: false,
  })

  if(flag2 === true){
    dispatch(getAllVideogames());
    dispatch(setFlag())
  }
 
  const paginado = (page) => {
    dispatch(setPage(page))
  };

  useEffect(() => {
    if (allVideogames.length === 0) {
    dispatch(getAllVideogames());
    dispatch(getGenres());
  }
  }, [dispatch,allVideogames]);

  const searchHandler = (videogame) => {
    dispatch(setPage(1))
    dispatch(getSomeVideogames(videogame));
  };

  function handleFilterGenre(e) {
    setFiltrados({ ...filtrados, genre: e.target.value });
  }

  function handleFilterOrigin(e) {
    setFiltrados({ ...filtrados, origin: e.target.value });
  }

  function handleFilter(e) {

    setFiltrados({ ...filtrados, filter: e.target.value });
  }


  function handleRefresh(e) {
    e.preventDefault();
    dispatch(setPage(1))
    dispatch(getAllVideogames());
  }

  function handleFilters() {
    dispatch(applyFilters(filtrados));
    dispatch(setPage(1))
    if(filtrados.flag === true) setFiltrados({ ...filtrados, flag: false })
    else setFiltrados({ ...filtrados, flag: true })
  }

 

  if(allVideogames.length !== 0 || flag === true ){
    flag = true;
  return (
    <div className={s.home}>
      <div><button onClick={(e) => handleRefresh(e)}>Refresh Videogames</button>
      <Link to="/create"><button>Create Videogame</button></Link>
      <SearchBar searchHandler={searchHandler} />
      </div>
      <div>
        <select onChange={(e) => handleFilterGenre(e)}>
          <option value="All genres">All genres</option>
          {allGenres?.map((el) => {
            return <option key={el} value={el}>{el}</option>;
          })}
        </select>
        <select onChange={(e) => handleFilterOrigin(e)}>
          <option value="All">All Videogames</option>
          <option value="Api">Videogames in API</option>
          <option value="Db">Videogames in Database</option>
        </select>
        <select onChange={(e) => handleFilter(e)}>
          <option value="No filter">No filter</option>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
          <option value="worst">Ascendent By Rating</option>
          <option value="best">Descendent By Rating</option>
        </select>
        <button onClick={handleFilters}>Apply Filters</button>
        </div>
        <div className={s.paginado}>
        <Paginado
          itemsPerPage={itemsPerPage}
          allVideogames={allVideogames.length}
          paginado={paginado}
        />
        </div>
        <div className={s.page}>
         <h4>Page {currentPage}</h4> 
        </div>
      {shownItems !== "Not Found" && shownItems?.map((el) => {
        return (
          <VideogameCard
            key={el.id}
            name={el.name}
            genres={el.genres}
            img={el.background_image}
            id={el.id}
            rating={el.rating}
          />
        );
      })}
      {shownItems === "Not Found" && <img src="https://images-eu.ssl-images-amazon.com/images/I/41WFiORXhLL._SY445_SX342_QL70_ML2_.jpg" alt="not found" />}
    </div>
  )}
  else{
  return <Loading/>
  }
}
