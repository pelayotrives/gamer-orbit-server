module.exports = (app) => {
  app.use((req, res, next) => {
    // this middleware runs whenever requested page is not available
    res.status(404).json({ errorMessage: "This route does not exist" });
  });

  app.use((err, req, res, next) => {
    // whenever you call next(error), this middleware will handle the error
    // always logs the error
    console.error("ERROR", req.method, req.path, error);

    //! Handler para Token Auth

    if (err.status === 401) {
      res.status(401).json({errorMessage: "Credenciales no han podido ser validadas."})
      console.log(err.status, "Credenciales no han podido ser validadas.")
    }

    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
      res
        .status(500)
        .json({
          errorMessage: "Internal server error. Check the server console",
        });
    }
  });
};
