const app = require("express")();
const bodyParser = require("body-parser");
const config = require("./config");

console.log("/ *************** Server Start *************** \\");

// Initialisations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/health", (req, res) => res.sendStatus(200));

// Services Implementations
app.use("/api", require("./src/routes"));

// Error 404
app.use((req, res) => res.sendStatus(404));

// Other errors
app.use((err, req, res, next) => res.sendStatus(500));

// Server Start with the port in config file
app.listen(config.server.port, () => console.log(`Server start on port : ${config.server.port}`));