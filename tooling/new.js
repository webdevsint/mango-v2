const prompts = require("prompts");
const path = require("path");
const fs = require("fs");

const data = fs.readFileSync(
  path.resolve(__dirname, "../utils/boilerplate.txt"),
  "utf8"
);

const confirmName = async (name) => {
  const question = {
    type: "text",
    name: "confirmation",
    message: `are you sure with the name "${name}": (y/n)`,
    intial: "yes",
  };

  const response = await prompts(question);

  if (response.confirmation === "y" || response.confirmation === "yes") {
    await setSchema(name);
  } else {
    await setName();
  }
};

const confirmSchema = async (name, schema) => {
  const question = {
    type: "text",
    name: "confirmation",
    message: "is this the correct schema: (y/n) ",
  };

  console.log(schema);

  const response = await prompts(question);

  if (response.confirmation === "y" || response.confirmation === "yes") {
    const documents = require("../documents/list");

    documents.push(name);

    const document = data.replace("${SCHEMA}", JSON.stringify(schema));

    fs.mkdirSync(path.resolve(__dirname, "../documents/", name));
    fs.writeFileSync(
      path.resolve(__dirname, "../documents/", name, "document.js"),
      document
    );
    fs.writeFileSync(
      path.resolve(__dirname, "../documents/", name, "data.json"),
      "[]"
    );

    fs.writeFileSync(
      path.resolve(__dirname, "../documents/list.js"),
      `const list=${JSON.stringify(documents)};module.exports=list;`
    );

    console.log("document created!");
  } else {
    await setSchema();
  }
};

const setName = async () => {
  const question = {
    type: "text",
    name: "name",
    message: "document name: ",
  };

  const response = await prompts(question);

  console.log(await confirmName(response.name.trim()));
};

const setSchema = async (name) => {
  const question = {
    type: "text",
    name: "schema",
    message: "document schema: (seperate values with space) ",
  };

  const response = await prompts(question);

  const schema = response.schema.split(" ").filter((e) => e);

  await confirmSchema(name, schema);
};

(async () => {
  setName();
})();
