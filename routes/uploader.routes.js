const router = require("express").Router();

const uploader = require("../middlewares/cloudinary")

// esta ruta solo va a enviar una imagen a cloudinary y recibe el URL
router.post("/", uploader.single("image"), (req, res, next) => {
    
    console.log("ruta Post de uploader", req.file.path) // la imagen de cloudinary

    res.json(req.file.path)

})

module.exports = router;