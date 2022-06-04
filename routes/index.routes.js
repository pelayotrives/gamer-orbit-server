const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("Todo va correctamente.");
});

// You put the next routes here 👇
const authRoutes = require("./auth.routes.js")
router.use("/auth", authRoutes)

// You put the next routes here 👇
const gamesRoutes = require("./games.routes.js")
router.use("/videogames", gamesRoutes)

module.exports = router;
