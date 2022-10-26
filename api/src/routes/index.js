const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genre } = require("../db.js");
const { Op } = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// https://api.rawg.io/api/games/3498?key=aca01bc4051146259f341e95bd0ab196

router.get("/videogames/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).send("Numero de ID no brindado");

  try {
    let resultado = await axios(
      `https://api.rawg.io/api/games/${id}?key=aca01bc4051146259f341e95bd0ab196`
    );

    let platforms = [];

    resultado.data.platforms.map((el) => {
      platforms.push(el.platform.name);
    });

    let genres = [];

    resultado.data.genres.map((el) => {
      genres.push(el.name);
    });

    return res.status(200).json({
      name: resultado.data.name,
      description: resultado.data.description,
      release_date: resultado.data.released,
      rating: resultado.data.rating,
      platforms: platforms,
      genres: genres,
      background_image: resultado.data.background_image,
    });
  } catch (error) {
    try {
      let database = await Videogame.findByPk(id, { include: Genre });
      let genres = [];
      database.Genres.map((el) => genres.push(el.name));
      let platforms = database.platforms.split(" ");

      return res.status(200).json({
        id: database.id,
        name: database.name,
        description: database.description,
        release_date: database.release_date,
        rating: database.rating,
        platforms: platforms,
        genres: genres,
        background_image: database.background_image,
      });
    } catch (error) {
      return res.status(404).send("No se encontro esa ID");
    }
  }
});

// https://api.rawg.io/api/games?key=aca01bc4051146259f341e95bd0ab196

router.get("/videogames", async (req, res) => {
  const { name } = req.query;

  if (name) {
    var games = [];

    let resultado = await axios(
      `https://api.rawg.io/api/games?search=${name}&key=aca01bc4051146259f341e95bd0ab196`
    );

    if (resultado.data.results.length !== 0) {
      resultado.data.results.map((el) => {
        if (games.length === 15) return;
        let genres = [];

        el.genres.map((el) => {
          genres.push(el.name);
        });

        games.push({
          id: el.id,
          name: el.name,
          genres: genres,
          background_image: el.background_image,
          rating: el.rating,
        });
      });
      if (games.length === 15) return res.status(200).json(games);
    }

    let database = await Videogame.findAll({
      where: {
        name: {
          [Op.substring]: name,
        },
      },
      include: {
        model: Genre,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    if (resultado.data.results.length === 0 && database.length === 0)
      return res.status(404).send("No se encontraron juegos con ese nombre");

    database.map((el) => {
      let genres = [];

      el.Genres.map((g) => {
        genres.push(el.name);
      });

      games.push({
        id: el.id,
        name: el.name,
        description: el.description,
        release_date: el.release_date,
        rating: el.rating,
        background_image: el.background_image,
        platforms: el.platforms,
        genres: genres,
        flag: el.flag,
      });
    });
    if (games.length === 15) return res.status(200).json(games);
    return res.status(200).json(games);
  } else {
    var games = [];

    for (let index = 1; index < 6; index++) {
      let resultado = await axios(
        `https://api.rawg.io/api/games?key=aca01bc4051146259f341e95bd0ab196&page=${index}`
      );
      resultado.data.results.map((el) => {
        let genres = [];

        el.genres.map((el) => {
          genres.push(el.name);
        });

        games.push({
          id: el.id,
          name: el.name,
          genres: genres,
          background_image: el.background_image,
          rating: el.rating,
        });
      });
    }

    let database = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    if (database.length !== 0) {
      database.map((el) => {
        let genres = [];

        el.Genres.map((el) => {
          genres.push(el.name);
        });

        games.push({
          id: el.id,
          name: el.name,
          description: el.description,
          release_date: el.release_date,
          rating: el.rating,
          background_image: el.background_image,
          platforms: el.platforms,
          genres: genres,
          flag: el.flag,
        });
      });
    }
    return res.status(200).json(games);
  }
});

router.post("/videogames", async (req, res) => {
  const { name, description, release_date, rating, platforms, genre, background_image} =
    req.body;

  if ( !name || !description || platforms.length === 0 || genre.length === 0
  )
    return res.status(400).send("Faltan parametros");

  try {
    const newVideogame = await Videogame.create({
      name,
      description,
      release_date,
      rating,
      background_image,
      platforms: platforms.join(" "),
    });

    for (let i = 0; i < genre.length; i++) {
      let idGenre = await Genre.findAll({
        where: {
          name: genre[i],
        },
        attributes: ["id"],
      });
      await newVideogame.addGenre(idGenre[0].id);
    }

    return res.status(200).json(newVideogame);
  } catch (error) {
    return res.status(400).send("Error en alguno de los datos provistos");
  }
});

// https://api.rawg.io/api/genres?key=aca01bc4051146259f341e95bd0ab196

router.get("/genres", async (req, res) => {
  let genres = await Genre.findAll();

  if (genres.length === 0) {
    try {
      let genres = await axios(
        `https://api.rawg.io/api/genres?key=aca01bc4051146259f341e95bd0ab196`
      );
      let array = [];

      for (let i = 0; i < genres.data.results.length; i++) {
        array.push(genres.data.results[i].name);
        await Genre.create({ name: genres.data.results[i].name });
      }

      return res.status(200).json(array);
    } catch (error) {
      return res.status(400).send("Error");
    }
  } else {
    let array = [];
    genres.map((el) => array.push(el.name));
    return res.status(200).json(array);
  }
});

module.exports = router;
