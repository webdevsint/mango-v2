const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT

const routes = require("./routes/routes.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
