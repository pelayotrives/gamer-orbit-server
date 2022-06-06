const router = require("express").Router();
const GameModel = require("../models/Game.model");
const axios = require("axios");
let page = 1;

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

// // ! GET "api/videogames/:id/details"
// router.get("/videogames/:id/details", async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const response = await GameModel.findById(id);
//     res.json(response);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;

