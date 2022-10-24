import {
  GET_ALL_VIDEOGAMES,
  GET_VIDEOGAME,
  GET_SOME_VIDEOGAMES,
  GET_GENRES,
} from "../actions";

const initialState = {
  videogames: [],
  videogame: {},
  genres: [],
  allVideogames: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      const auxiliar = [];
      action.payload.map(el => auxiliar.push(el))
      return {
        ...state,
        videogames: action.payload,
        allVideogames: auxiliar,
      };
    case GET_SOME_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
      };
    case GET_VIDEOGAME:
      return {
        ...state,
        videogame: action.payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
   
    case "CLEAR_DETAIL":
      return{
          ...state,
          videogame:{},
      }

    case "APPLY_FILTERS":
      const allVideogames = state.allVideogames;
      let filtered =
        action.payload.genre === "All genres"
          ? allVideogames
          : allVideogames.filter((el) => el.genres.includes(action.payload.genre));
      
      if(action.payload.origin !== "All"){ 
      if(action.payload.origin === "Api")filtered = filtered.filter((el) => !el.flag)
      else filtered = filtered.filter((el) => el.flag)} 

      if(action.payload.filter !== "No filter"){
        if(action.payload.filter === "asc"){
          filtered.sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (b.name > a.name) {
              return -1;
            }
            return 0;
          })
        }

        if(action.payload.filter === "desc"){
          filtered.sort(function (a, b) {
            if (a.name > b.name) {
              return -1;
            }
            if (b.name > a.name) {
              return 1;
            }
            return 0;
          })
        }

        if(action.payload.filter === "worst"){
          filtered.sort(function (a, b) {
            if (a.rating > b.rating) {
              return 1;
            }
            if (b.rating > a.rating) {
              return -1;
            }
            return 0;
          })
        }

        if(action.payload.filter === "best"){
          filtered.sort(function (a, b) {
            if (a.rating > b.rating) {
              return -1;
            }
            if (b.rating > a.rating) {
              return 1;
            }
            return 0;
          })
        }
      }
      if(filtered.length === 0) filtered = "Not Found";
      return{
          ...state,
          videogames: filtered,
      }
    default:
      return state;
  }
};

export default rootReducer;
