import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogame } from "../../redux/actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory} from "react-router-dom";
import s from "./DetailCard.module.css";
import { clearDetail } from "../../redux/actions";

export default function DetailCard() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const videogame = useSelector((state) => state.videogame);
  const history = useHistory();

  useEffect(() => {
    dispatch(getVideogame(id));
  },[dispatch,id]);

  function handleBack() {
    dispatch(clearDetail())
    history.push("/home")
  }

  if(Object.entries(videogame).length !== 0){
  return (
    <div>
      <br></br>
      <div className={s.algo}>
        <button className={s.back} onClick={handleBack}>Back</button>
        <h2 className={s.titulo}>{videogame.name}</h2>
        <div>
          <img className={s.img} src={videogame.background_image} alt="not found" />
          <div className={s.text}>
          Description:{" "}
            {videogame.description &&
              videogame.description.replace(/<[^>]+>/g, "")}
          </div>
          <div className={s.text}>Release Date: {videogame.release_date}</div>
          <div className={s.text}>Rating: {videogame.rating}</div>
          <div className={s.text}>
            Platforms: {videogame.platforms && videogame.platforms.join(" - ")}
          </div>
          <div className={s.text}>Genres: {videogame.genres && videogame.genres.join(" - ")}</div>
        </div>
      </div>
    </div>
  );}
  else{
    return(
      <div><img className={s.gif} src="https://i.gifer.com/VAyR.gif" alt="not found"/></div>
    )
  }
}
