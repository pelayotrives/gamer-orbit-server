const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("Todo va correctamente.");
});

// You put the next routes here 👇
const authRoutes = require("./auth.routes.js")
router.use("/auth", authRoutes)

module.exports = router;
