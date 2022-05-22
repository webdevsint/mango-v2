const aes256 = require("aes256");

// helper functions
const verify = (document) => {
  const documents = require("../documents/list");

  if (!documents.includes(document)) {
    return false
  }
};

function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

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
  arrayEquals,
  Encryption,
  Decryption,
};
