const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("Todo va correctamente.");
});

// You put the next routes here 👇
const authRoutes = require("./auth.routes.js")
router.use("/auth", authRoutes)

const gamesRoutes = require("./games.routes.js")
router.use("/videogames", gamesRoutes)

const profileRoutes = require("./profile.routes.js")
router.use("/profile", profileRoutes)

module.exports = router;
