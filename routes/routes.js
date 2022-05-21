const timestamp = require("time-stamp");
const { nanoid } = require("nanoid");
const express = require("express");
const path = require("path");
const fs = require("fs");

require("dotenv").config();

const API_KEY = process.env.API_KEY;

const router = express.Router();

const { verify, arrayEquals, encrypt, decrypt } = require("../utils/helpers");

router.get("/", (req, res) => {
  res.sendStatus(400);
});

router.get("/document/:document", (req, res) => {
  const key = req.query.key;

  const document = req.params.document;

  verify(document, res);

  if (key === API_KEY) {
    try {
      const data = fs.readFileSync(
        path.resolve(__dirname, `../documents/${document}/data.json`),
        "utf-8"
      );

      res.status(200).json(JSON.parse(data));
    } catch (err) {
      console.log(err);

      res.sendStatus(400);
    }
  } else {
    res.status(404).send("Invalid API key!");
  }
});

router.post("/document/:document", (req, res) => {
  const document = req.params.document;
  const key = req.query.key;

  verify(document, res);

  if (key === API_KEY) {
    const entry = req.body;

    const { schema } = require(`../documents/${document}/document`);

    if (Object.keys(entry).length !== 0) {
      const keys = Object.keys(entry);

      if (arrayEquals(keys, schema)) {
        const { addEntry } = require(`../documents/${document}/document`);

        formattedEntry = Object.assign({ id: nanoid(8) }, entry);
        formattedEntry.timestamp = timestamp("YYYY/MM/DD HH:mm:ss");

        addEntry(formattedEntry);

        res.status(200).json({
          status: "success",
          message: "entry added",
          entry: formattedEntry,
        });
      } else {
        res.status(400).json({
          error: "invalid entry structure",
          schema: {
            required: schema,
            used: keys,
          },
        });
      }
    } else {
      res.status(400).send("Entry cannot be an empty object!");
    }
  } else {
    res.status(404).send("Invalid API key!");
  }
});

router.delete("/document/:document", (req, res) => {
  const document = req.params.document;
  const key = req.query.key;

  verify(document, res);

  if (key === API_KEY) {
    const index = req.body.index || req.query.index;

    const { removeEntry } = require(`../documents/${document}/document`);

    removeEntry(index);
  } else {
    res.status(404).send("Invalid API key!");
  }
});

module.exports = router;
