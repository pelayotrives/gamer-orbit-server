const router = require("express").Router();
const UserModel = require("../models/User.model.js")
const isAuthenticated = require("../middlewares/isAuthenticated.js");

/* Paquetes */
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs");


// ! POST "/api/auth/signup"
router.post("/signup", async (req, res, next) => {

    const { username, email, password } = req.body
    
    if (!username || !email || !password ) {
        res.status(400).json({ errorMessage: "Es necesario rellenar todos los campos." })
        return;
    }
    
    if (username.length < 3) {
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
        console.log(error)
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

        //******************************************************************

        //! Paso 1
        // Creamos el objeto payload para comenzar a interactuar con el token del usuario.

        const payload = {
            _id: foundUser._id,
            username: foundUser.username,
            email: foundUser.email
            // No guardaremos la contraseña como recomendación para evitar un uso malicioso del cifrado.
        }

        //! Paso 2
        // Nos ponemos en contacto con el paquete JWT.
        const authToken = jwt.sign(
            payload, // Le pasamos nuestro payload (los datos del usuario)
            process.env.TOKEN_SECRET, // Clave secreta del archivo .env
            { algorithm: "HS256", expiresIn: "24h" } // La información del header en forma de objeto (el algoritmo y cada cuanto expira la "sesión").

        )

        // Le enviamos el token al usuario.
        res.json( { authToken: authToken } )

        //******************************************************************

    } catch (error) {
        next(error)
    }
})

// ! GET "/api/auth/verify"
router.get("/verify", isAuthenticated, (req, res, next) => {

    //! 1. Check para ver si el token es válido.
    res.json(req.payload) //TODO ---> Esto es como nuestro req.session.user ¡SÚPER IMPORTANTE! Ya que de aquí, sacamos toda información del usuario logueado.
    console.log("Todo bien con el middleware.");
    res.json("Todo bien con el middleware.")
    //! 2. Envía al frontend la información del usuario del token.

})


module.exports = router;