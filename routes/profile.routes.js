const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated.js");
const UserModel = require("../models/User.model.js");

// ! GET "api/profile"

router.get("/profile", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;

  try {
    const response = await UserModel.findById(_id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// ! GET "api/profile/edit"

router.get("/profile/edit", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;

  try {
    const response = await UserModel.findById(_id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// ! PATCH "api/profile/edit"

router.patch("/profile/edit", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  const {
    avatar,
    city,
    country,
    address,
    aboutme,
    sex,
    birthdate,
    collections,
  } = req.body;

  try {
    const response = await UserModel.findByIdAndUpdate(_id, {
      avatar, // Actualizar desde req.file.path
      city,
      country,
      address,
      aboutme,
      sex,
      birthdate,
      collections,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// ! DELETE "api/profile/delete"
router.delete("/profile/delete", async (req, res, next) => {
  const { _id } = req.payload;

  try {
    await UserModel.findByIdAndDelete(_id);
    res.json("Perfil eliminado correctamente.");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
