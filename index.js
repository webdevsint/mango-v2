const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

const routes = require("./routes/routes.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use("/", routes);

app.listen(PORT, () => {
  console.log("Server started at http://localhost:3000");
});
