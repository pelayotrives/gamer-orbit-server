const router = require("express").Router();
const GameModel = require("../models/Game.model");
const axios = require("axios");
let page = 5;

//! Const de llamada
const root = "https://api.rawg.io/api/"; //* ---> Constante base
const allGames = `${root}games?key=${process.env.API_KEY}&page=${page}&page_size=40`;


// ! GET "api/videogames"
router.get("/", async (req, res, next) => {
  try {
    const response = await axios.get(allGames);
    res.json(response.data);
  } catch (error) {
    navigate(error);
  }
});

// ! GET "api/videogames/:id/details"
router.get("/:id/details", async (req, res, next) => {

  const {id} = req.params
  console.log(id);
  const gamesDetails = `https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`;

  try {
    const response = await axios.get(gamesDetails);
    res.json(response.data);
    console.log(response.data)
  } catch (error) {
    next(error);
  }
});

// ! GET "api/videogames/:id/trailers" ---> RUTA DE BACK DISTINTA PERO LA MISMA EN FRONT.
router.get("/:id/trailers", async (req, res, next) => {

    const {id} = req.params
    console.log(id);
    const gamesTrailers = `https://api.rawg.io/api/games/${id}/movies?key=${process.env.API_KEY}`;
  
    try {
      const response = await axios.get(gamesTrailers);
      res.json(response.data);
      console.log(response.data)
    } catch (error) {
      next(error);
    }
  });

module.exports = router;

