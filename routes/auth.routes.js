const router = require("express").Router();
const UserModel = require("../models/User.model.js")

const bcryptjs = require("bcryptjs");

// ! POST "/api/auth/signup"
router.post("/signup", async (req, res, next) => {

    const { username, email, password } = req.body

    if (!username || !email || !password ) {
        res.status(400).json({ errorMessage: "Es necesario rellenar todos los campos." })
        return;
    }

    if (username.length < 6) {
        res.status(400).json({ errorMessage: "El usuario debe tener al menos 6 caracteres." })
        return;
    }

    // ! incluir la configuración de la complejidad de la contraseña (ej: 8 cara, 1 mayus, etc)
    let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
    if (!regex.test(password)) {
        res.status(400).json({ errorMessage: "La contraseña no cumple los requisitos mínimos. Debe tener 8 caracteres, una mayúscula, un número y un carácter especial." })
        return;
    }
    
    try {

        const foundUser = await UserModel.findOne({ $or: [{username}, {email}] })
        if (foundUser !== null) {
            res.status(400).json({ errorMessage: "El usuario ya existe." })
            return;
        }

        const salt = await bcryptjs.genSalt(12)
        const hashPassword = await bcryptjs.hash(password, salt)
        
        await UserModel.create({
            username,
            email,
            password: hashPassword
        })

        res.json("El usuario ha sido creado.")

    } catch (error) {
        next(error)
    }
})

// ! POST "/api/auth/login"
router.post("/login", async (req, res, next) => {

    const { username, password } = req.body

    if (!username || !password ) {
        res.status(400).json({ errorMessage: "Es necesario rellenar todos los campos." })
        return;
    }

    try {

        const foundUser = await UserModel.findOne({username})
        if (foundUser === null) {
            res.status(400).json({ errorMessage: "El usuario no existe." })
            return;
        }

        const passwordMatch = await bcryptjs.compare(password, foundUser.password)

        if (!passwordMatch) {
            res.status(401).json( { errorMessage: "El password no es correcto." })
            return;
        }

    } catch (error) {
        next(error)
    }
})

// ! GET "/api/auth/verify"
router.post("/verify", async (req, res, next) => {




    try {

    } catch (error) {

    }
})


module.exports = router;