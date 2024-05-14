<h1 align='center'>Mastering The Foundation of Express</h1>

## Topics:

1. What is Nodejs , a high level overview of node.js
2. What is module, commonjs vs esm
3. File System Module , synchronous vs asynchronous
4. Event driven architecture, create your own events
5. Stream and buffer, create your own server
6. Installing express with typescript
7. What is parsers, request and response object
8. Middleware in express.js
9. Routing in express.js
10. Express error handling

## Table of Contents:

- [What is Nodejs , a high level overview of Node.js](#what-is-nodejs--a-high-level-overview-of-nodejs)
  - [Previously in the world of Web](#previously-in-the-world-of-web)
  - [Node.js Modules](#nodejs-modules)
  - [Why Node.js is Popular?](#why-nodejs-is-popular)
  - [Cons of using Node.js](#cons-of-using-nodejs)
  - [Dependencies of Node JS](#dependencies-of-node-js)
  - [V8 Engine](#v8-engine)
  - [Libuv](#libuv)
  - [Libuv implements 2 important parts of Node JS](#libuv-implements-2-important-parts-of-node-js)
  - [Event Loop](#event-loop)
  - [Thread Pool](#thread-pool)
- [What is module, COMMONJS vs ESM](#what-is-module-commonjs-vs-esm)
  - [What is a module?](#what-is-a-module)
  - [Modular System](#modular-system)
- [File System Module , synchronous vs asynchronous](#file-system-module--synchronous-vs-asynchronous)
  - [Synchronous way to read and write files](#synchronous-way-to-read-and-write-files)
  - [Asynchronous way to read and write files](#asynchronous-way-to-read-and-write-files)
- [Event driven architecture, create your own events](#event-driven-architecture-create-your-own-events)
  - [Stream and Buffer](#stream-and-buffer)
  - [Event Driven Architecture](#event-driven-architecture)
- [Stream and buffer, create your own server](#stream-and-buffer-create-your-own-server)
  - [Different types of streams](#different-types-of-streams)
  - [Code Example of using the `fs.readFile()` and `fs.writeFile()`](#code-example-of-using-the-fsreadfile-and-fswritefile)
  - [Code example of using the `fs.createReadStream()` and `fs.createWriteStream()`](#code-example-of-using-the-fscreatereadstream-and-fscreatewritestream)
  - [Full example](#full-example)
  - [Readable Stream and Raw Node Server](#readable-stream-and-raw-node-server)

# What is Nodejs , a high level overview of Node.js

### Previously in the world of Web

- Static Content
- Beautiful UI
- Interactive UI

### Node.js Modules

- Operating System Module
- File System Module (fs)
- Path Module (path)
- HTTP Module (http)
- URL Module (url)
- Utilities Module (util)

### Why Node.js is Popular?

- We can use JavaScript on server-side
- Build highly scalable backend application
- It is single threaded, event-driven and works non blocking I/O
- Perfect building data intensive, streaming application

### Cons of using Node.js

- Highly CPU intensive tasks

But you can do using worker threads

### Dependencies of Node JS

- V8 Engine
- Libuv

### V8 Engine

Node JS runtime is based on V8 Engine written in C++ & JavaScript. Without V8 NodeJS would never understand JavaScript code.

**V8 is the most important dependencies of Node JS**

### Libuv

Libuv is an open source library written on C++ which focuses on asynchronous I/O and gives node access to Computer OS, File Systems, Networking etc.

### Libuv implements 2 important parts of Node JS

- Event Loop
- Thread Pool

### Event Loop

- Executes callback functions
- Network I/O

### Thread Pool

- CPU Intensive Tasks
- File Access
- File Compression
- Cryptography

# What is module, COMMONJS vs ESM

### What is a module?

A module is an isolated and reusable block of code that has it own scope.

### Modular System

1. Local Modules (we create)
2. Built in Modules (come with node.js)
3. Third party modules (created by others)

# File System Module , synchronous vs asynchronous

### Synchronous way to read and write files

```jsx
const fs = require("fs");
// read file
const file = fs.readFileSync(__dirname + "/test.txt", "utf-8");
console.log(file);
```

```jsx
const fs = require("fs");
// write file
fs.writeFileSync(
  __dirname + "/hello.txt",
  "Level up your leven with Level-2",
  "utf-8"
);
```

### Asynchronous way to read and write files

```jsx
const fs = require("fs");

// read file
fs.readFile(__dirname + "/hello.txt", "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

```jsx
const fs = require("fs");

// write file
fs.writeFile(
  __dirname + "/test-async.txt",
  "This test data is written by fs module asynchronous",
  "utf-8",
  (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  }
);
```

# Event driven architecture, create your own events

### Stream and Buffer

It is used to process a data piece by piece which is called buffer.

### Event Driven Architecture

`Event Emitter` → `Event Listener` → `Callback`

**Code Example:**

```jsx
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}

const emitter = new MyEmitter();

// creating event listener
emitter.on("birthday", () => {
  console.log(`Today is my birthday`);
});

// emitting an event
emitter.emit("birthday");
```

# Stream and buffer, create your own server

It is used to process a data piece by piece which is called buffer.

- It is better in terms of user experience.
- Needs short memory storage as it do not complete whole process at once.

### Different types of streams

1. Readable Stream - a stream where we can read data (ex. http req, fs.readStream)
2. Writable Stream - a stream where we can write data (ex. http response, fs.writeStream)
3. Duplex Stream - a stream for both write and read
4. Transform Stream - a stream where can we reshape data

### Code Example of using the `fs.readFile()` and `fs.writeFile()`

```jsx
const fs = require("fs");

// This is not good practice
fs.readFile(__dirname + "/buffer-stream.txt", "utf-8", (err, data) => {
  if (err) throw err;

  fs.writeFile(__dirname + "/output.txt", data, "utf-8", (err) => {
    if (err) throw err;
  });
});
```

### Code example of using the `fs.createReadStream()` and `fs.createWriteStream()`

```jsx
const fs = require("fs");

// create a readable stream
const readableStream = fs.createReadStream(
  __dirname + "/buffer-stream.txt",
  "utf-8"
);

// create a writable stream
const writableStream = fs.createWriteStream(__dirname + "/output.txt", "utf-8");

readableStream.on("data", (data) => {
  writableStream.write(data, (err) => {
    if (err) throw err;
  });
});
```

### Full example

```jsx
const fs = require("fs");

// create a readable stream
const readableStream = fs.createReadStream(
  __dirname + "/buffer-stream.txt",
  "utf-8"
);

// create a writable stream
const writableStream = fs.createWriteStream(__dirname + "/output.txt", "utf-8");

readableStream.on("data", (data) => {
  // writableStream.write(data, (err) => {
  //   if (err) throw err;
  // });
});

//  another way to write
readableStream.pipe(writableStream);

readableStream.on("error", (err) => {
  throw err;
});

writableStream.on("error", (err) => {
  throw err;
});

writableStream.on("finish", () => {
  console.log("Finished writing file");
});
```

### Readable Stream and Raw Node Server

```jsx
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
```
