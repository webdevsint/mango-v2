const timestamp = require("time-stamp");
const { nanoid } = require("nanoid");
const express = require("express");
const path = require("path");
const fs = require("fs");

require("dotenv").config();

const API_KEY = process.env.API_KEY;
const KEY = process.env.KEY;

const router = express.Router();

const {
  verify,
  schemaValidator,
  Encryption,
  Decryption,
} = require("../utils/helpers");

router.get("/", (req, res) => {
  res.sendStatus(400);
});

router.get("/document/:document", (req, res) => {
  const key = req.query.key;

  const document = req.params.document;

  if (verify(document) !== false) {
    if (key === API_KEY) {
      try {
        const data = JSON.parse(
          fs.readFileSync(
            path.resolve(__dirname, `../documents/${document}/data.json`),
            "utf-8"
          )
        );

        const results = [];

        data.forEach((entry) => {
          results.push(
            JSON.parse(new Decryption(entry.encrypted, KEY).decrypted)
          );
        });

        res.status(200).json(results);
      } catch (err) {
        res.sendStatus(500);
      }
    } else {
      res.status(400).json({ error: "invalid api key!" });
    }
  } else {
    res.status(400).json({ error: "document not found!" });
  }
});

router.post("/document/:document", (req, res) => {
  const document = req.params.document;
  const key = req.query.key;

  if (verify(document) !== false) {
    if (key === API_KEY) {
      const entry = req.body;

      const { schema } = require(`../documents/${document}/document`);

      if (Object.keys(entry).length !== 0) {
        const keys = Object.keys(entry);

        if (schemaValidator(schema, entry)) {
          const { addEntry } = require(`../documents/${document}/document`);

          const id = nanoid(8);

          formattedEntry = Object.assign({ id: id }, entry);
          formattedEntry.timestamp = timestamp("YYYY/MM/DD HH:mm:ss");

          addEntry(new Encryption(id, JSON.stringify(formattedEntry), KEY));

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
        res.status(400).json({ message: "entry cannot be an empty object!" });
      }
    } else {
      res.status(400).json({ error: "invalid api key!" });
    }
  }
});

router.delete("/document/:document", (req, res) => {
  const document = req.params.document;
  const key = req.query.key;

  if (verify(document) !== false) {
    if (key === API_KEY) {
      const index = req.body.index || req.query.index;

      if (index !== undefined) {
        const { removeEntry } = require(`../documents/${document}/document`);

        removeEntry(index);

        res.status(200).json({ status: "success", message: "entry deleted!" });
      } else {
        res.status(400).json({ error: "index is undefined!" });
      }
    } else {
      res.status(400).json({ error: "invalid api key!" });
    }
  }
});

module.exports = router;
