import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, createVideogame, setFlag } from "../../redux/actions";
import { Link, useHistory } from "react-router-dom";
import s from "./CreateVideogame.module.css";

let flag = true;

export default function CreateVideogame() {

function validate(input) {
  let errors = {};
  if (!input.name) errors.name = "Name is required";
  if (!input.description) errors.description = "Description is required";
  if (!input.platforms.length)
    errors.platforms = "Must select at least 1 platform";
  if (!input.genre.length) errors.genre = "Must select at least 1 genre";
  if(!input.release_date) errors.release_date = "Must select a date"
  if(input.name){
  /*
  allVideogames.map(el => {
  const string1 = el.name
  const string2 = input.name
  if(string1 === string2) errors.name = "Game already exists";
  })
  */
  const aux = (el) => el.name === input.name;
  if(allVideogames.some(aux)) errors.name = "Game already exists"
}
return errors;
}
  const [input, setInput] = useState({
    name: "",
    description: "",
    release_date: "",
    rating: 0,
    background_image: "",
    platforms: [],
    genre: [],
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();
  var allGenres = useSelector((state) => state.genres);
  const allVideogames = useSelector((state) => state.videogames);
  const platformCheckbox = [
    "PC",
    "Xbox Series",
    "PlayStation Series",
    "Nintendo Series",
    "Sega Series",
  ];

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault()
    input.name = input.name.charAt(0).toUpperCase() + input.name.slice(1);
    if(input.background_image === "") input.background_image = "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png";
    dispatch(createVideogame(input));
    setInput({
      name: "",
      description: "",
      release_date: "",
      rating: 0,
      background_image: "",
      platforms: [],
      genre: [],
    });
    history.push("/home");
    dispatch(setFlag())
  };

  const handleInputChange = function (e) {
    flag = false;
    if (e.target.name === "genre" || e.target.name === "platforms") {
      if (input[e.target.name].includes(e.target.value)) {
        let newItem = input[e.target.name];
        newItem = newItem.filter((el) => el !== e.target.value);
        setInput({ ...input, [e.target.name]: newItem });
        setErrors(validate({ ...input, [e.target.name]: newItem }));
      } else {
        let newItem = input[e.target.name];
        newItem.push(e.target.value);
        setInput({ ...input, [e.target.name]: newItem });
        setErrors(validate({ ...input, [e.target.name]: newItem }));
      }
    } else {
      setInput({ ...input, [e.target.name]: e.target.value });
      setErrors(validate({ ...input, [e.target.name]: e.target.value }));
    }
  };

  const handleDelete = function (el){
    setInput({
      ...input,
      genre: input.genre.filter( g => g !== el)
    })
    if(input.genre.length === 1) {
      flag = true;
      setErrors({
        ...errors
      })
    }

  }

  return (
    <div className={s.main}>
      <br></br>
      <div>
          <Link to="/home">
            <button className={s.back} type="button">Back</button>
          </Link>
      </div>
      <div className={s.form}>
      <form onSubmit={(e) => handleSubmit(e)}>
      <div>
        
        <br/>
  
        <div className={s.el}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Videogame name"
          value={input.name}
          onChange={handleInputChange}
        />
        {errors.name && <p className={s.errors}>{errors.name}</p>}
        </div>

        <div className={s.el}>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={input.description}
          onChange={handleInputChange}
        />
        <br></br>
        {errors.description && <p className={s.errors}>{errors.description}</p>}
        </div>

        <div className={s.el}>
        <label>Release Date:</label>
        <input
          type="date"
          name="release_date"
          placeholder="Release Date"
          value={input.release_date}
          onChange={handleInputChange}
        />
        <br></br>
        {errors.release_date && <p className={s.errors}>{errors.release_date}</p>}
        </div>

        <div className={s.el}>
        <label>Rating:</label>
        <input
          type="number"
          name="rating"
          max= "5"
          min= "0"
          placeholder="Rating"
          value={input.rating}
          onChange={handleInputChange}
        />
        <br></br>
        </div>

        <div className={s.el}>
        <label>Image URL:</label>
        <input
          type="url"
          name="background_image"
          placeholder="Image URL"
          value={input.background_image}
          onChange={handleInputChange}
        />
        <br></br>
        </div>

        <div className={s.el}>
        <label>Platforms:</label>
        {platformCheckbox?.map((el) => {
          return (
            <div key={el} className={s.checkbox}>
              <input
                type="checkbox"
                id={el}
                name="platforms"
                value={el}
                onChange={handleInputChange}
              />
              <label>{el}</label>
              <br />
            </div>
          );
        })}
        {errors.platforms && <p className={s.errors}>{errors.platforms}</p>}
        </div>

        <div className={s.el}>
        <label>Genre:</label>
        <select defaultValue={'default'} name="genre" onChange={handleInputChange}>
          <option disabled={true} value='default'></option>
        {allGenres?.map(el => (       
              <option key={el} value={el}>{el}</option>
              ))}
        </select>
        {errors.genre && <p className={s.errors}>{errors.genre}</p>}
        </div>

        <div className={s.generos}>
    {input.genre.map(el => (
      <div key={el} className={s.selected}>
        <p>{el}</p>
        <button type="button" onClick={() => handleDelete(el)}>x</button>
      </div>
      ))}
    </div>

        <div>
        <input
          type="submit"
          value="submit"
          disabled={Object.entries(errors).length !== 0 || flag===true}
        />
        </div>
      </div>
    </form>
    
    </div>
  </div>
  );
}
