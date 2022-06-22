const aes256 = require("aes256");

const verify = (document) => {
  const documents = require("../documents/list");

  if (!documents.includes(document)) {
    return false
  }
};

const schemaValidator = (schema, input) => {

  const inputKeys = Object.keys(input);

  if (schema.length !== inputKeys.length) return false;

  for (let i = 0; i < schema.length; i++) {
    if (!inputKeys.includes(schema[i])) {
      return false;
    }
  }

  return true;

};

class Encryption {
  constructor(id, text, key) {
    const plainText = text;
    const buffer = Buffer.from(plainText);
    this.id = id;
    this.encrypted = aes256.encrypt(key, plainText);
  }
}

class Decryption {
  constructor(text, key) {
    const encryptedText = text;
    this.decrypted = aes256.decrypt(key, encryptedText);
  }
}

module.exports = {
  verify,
  schemaValidator,
  Encryption,
  Decryption,
};
