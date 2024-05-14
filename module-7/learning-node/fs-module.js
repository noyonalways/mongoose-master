const fs = require("fs");

// reading a text file
const texts = fs.readFileSync(__dirname + "/texts/dummy-texts.txt", "utf-8");
// console.log(texts);

// written a text file
const writtenTexts = fs.writeFileSync(
  __dirname + "/texts/write.txt",
  texts + "This is my written file",
  "utf-8"
);

console.log(writtenTexts);
