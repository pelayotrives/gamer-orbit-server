const { expressjwt } = require("express-jwt");

const isAuthenticated = expressjwt({
    secret: process.env.SECRET_TOKEN,
    algorithms: ["HS256"],
    requestProperty: "payload", // Esto hace que una vez se pase por el middleware, se nos retorna el payload.
    getToken: (req) => { 

        // Si no existiese token o hubiera algún problema...
        //! En req.headers es donde se envía el token, ya que req.body es algo más inseguro para este tipo de información.
        if (req.headers === undefined || req.headers.authorization === undefined) {
            console.log("No existe el token.");
            return null;
        }

        console.log(req.headers.authorization);

        const tokenArr = req.headers.authorization.split(" ")
        const tokenType = tokenArr[0]
        const token = tokenArr[1]

        // Estamos haciendo split(). La primera palabra, como podemos ver en el log, es Bearer, un espacio, y el token.
        // Si la primera palabra no es Bearer, estaremos usando un tipo de token inadecuado.
        if (tokenType !== "Bearer") {
            console.log("Tipo de token inválido.");
            return null;
        }

        console.log("El token fue entregado.");
        return token;

    }
})

module.exports = isAuthenticated;