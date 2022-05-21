const path = require("path");
const fs = require("fs");

const data = require("./data.json");

const schema = ['name', 'age']

const save = (data) => {
  fs.writeFileSync(
    path.resolve(__dirname, "./data.json"),
    JSON.stringify(data)
  );
};

// add entry
const addEntry = (entry) => {
  data.push(entry);

  save(data);
};

// delete entry
const removeEntry = (index) => {
  data.splice(index, 1);

  save(data);
};

// addEntry({ text: 'hi mom' })
// removeEntry(0)

module.exports = {
  schema,
  addEntry,
  removeEntry,
};
