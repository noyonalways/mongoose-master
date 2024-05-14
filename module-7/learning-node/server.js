const http = require("http");
const fs = require("fs");
const PORT = 5000;

// creating a server using raw node.js
const server = http.createServer();

// listener
server.on("request", (req, res) => {
  if (req.url === "/read-file" && req.method === "GET") {
    const readableStream = fs.createReadStream(
      __dirname + "/texts/dummy-texts.txt",
      "utf-8"
    );

    readableStream.on("data", (buffer) => {
      res.write(buffer);
    });

    readableStream.on("end", () => {
      res.end();
    });

    readableStream.on("error", (err) => {
      res.write(err);
      res.end();
    });
  } else {
    res.write("404 not found");
    res.end();
  }
});

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
