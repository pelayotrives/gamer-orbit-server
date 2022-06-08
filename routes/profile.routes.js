const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated.js");
const UserModel = require("../models/User.model.js");

// -------> Todo nuestro CRUD
// El isAuthenticated lo usamos para poder tener acceso a req.payload, por eso lo usamos como Middleware, para obtener el id del usuario.

// ! GET "api/profile"

router.get("/", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;

  try {
    const response = await UserModel.findById(_id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// ! GET "api/profile/:id/edit"

router.get("/:id/edit", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;

  try {
    const response = await UserModel.findById(_id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// ! PATCH "api/profile/:id/edit"

router.patch("/:id/edit", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  const {
    avatar,
    city,
    country,
    address,
    aboutme,
    genre,
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
      genre,
      birthdate,
      collections,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//!  DELETE "/api/profile/:id/delete" => Para borrar los perfiles. No usamos POST. Usamos un método DELETE.
// router.delete("/:id/delete", async (req, res, next) => { ----> Al poner router.delete(), no haría falta establecer que la ruta es "/:id/delete", solo "/:id/".
router.delete("/:id", isAuthenticated, async (req, res, next) => {

  // Con esto tendría el ID del perfil que estoy buscando. Viene del payload, por lo que no necesitamos params.
  const { _id } = req.payload;
  
  try {
      await UserModel.findByIdAndDelete(_id) // No hace falta la asignación a una variable response, ya que estamos borrando simplemente.
      res.json("Perfil eliminado correctamente."); // Siempre, siempre, hay que dar una respuesta.
  }
  catch (error) {
      next(error)
  }
})


//! PATCH "api/profile/:gamesId/collections"
// router.patch("/:gamesId/collections", isAuthenticated, async (req, res, next) => {
//     const {_id} = req.payload;
//     const {gamesId} = req.params;
  
//     try {
//       await UserModel.findByIdAndUpdate(_id, {$addToSet: {collections: gamesId}})
//       res.json("Videojuego ha sido añadido a tus Colecciones")
//     } catch (error) {
//       next(error)
//     }
//   })

module.exports = router;
