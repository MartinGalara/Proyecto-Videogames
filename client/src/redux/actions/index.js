import axios from "axios";
export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_VIDEOGAME = "GET_VIDEOGAME";
export const GET_SOME_VIDEOGAMES = "GET_SOME_VIDEOGAMES";
export const GET_GENRES = "GET_GENRES";

export function getAllVideogames() {
  return async function (dispatch) {
    var allVideogames = await axios.get(`http://localhost:3001/videogames`);
    return dispatch({
      type: GET_ALL_VIDEOGAMES,
      payload: allVideogames.data,
    });
  };
}

export function getVideogame(id) {
  return async function (dispatch) {
    const videogame = await axios.get(`http://localhost:3001/videogames/${id}`);
    return dispatch({
      type: GET_VIDEOGAME,
      payload: videogame.data,
    });
  };
}

export function getSomeVideogames(name) {
  return async function (dispatch) {
    try {
      var allVideogames = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      );
    } catch (error) {
      if(error.response.status === 404) {
        allVideogames = {data: "Not Found"}
      }
    }
    return dispatch({
      type: GET_SOME_VIDEOGAMES,
      payload: allVideogames.data,
    });
  };
}

export function createVideogame(arg) {
  return async function () {
    try {
      await axios.post("http://localhost:3001/videogames", { 
        name: arg.name,
        description: arg.description,
        release_date: arg.release_date,
        rating: arg.rating,
        platforms: arg.platforms,
        genre: arg.genre,
        background_image: arg.background_image,
        });
        alert("Videogame created!");
    } catch (error) {
      alert(error.response.data)
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    var allGenres = await axios.get(`http://localhost:3001/genres`);
    return dispatch({
      type: GET_GENRES,
      payload: allGenres.data,
    });
  };
}

export function filterByGenre(payload) {
  return {
    type: "FILTER_BY_GENRE",
    payload,
  };
}

export function filterByOrigin(payload) {
  return {
    type: "FILTER_BY_ORIGIN",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByRating(payload) {
  return {
    type: "ORDER_BY_RATING",
    payload,
  };
}

export function clearDetail(){
  return{
    type: "CLEAR_DETAIL",
  }
}

export function applyFilters(payload){
  return{
    type: "APPLY_FILTERS",
    payload,
  }
}

export function setPage(payload){
  return{
    type: "SET_PAGE",
    payload,
  }
}

export function setFlag(){
  return{
    type: "SET_FLAG"
  }
}
