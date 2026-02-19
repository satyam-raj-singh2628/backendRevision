const console = require("console");
const fs = require("fs");
const http = require("http");
const myServer = http.createServer((req, res) => {
  console.log("new Request");
  // console.log(req.headers);
  //   res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Hello World</h1>");
  res.end("server running");
});
myServer.listen(4000, () => {
  console.log("Server is running on port 4000");
});
// const os = require("os");
// console.log(os.cpus());

// fs.writeFileSync("hello.txt", "Hello World");
// fs.appendFileSync("hello.txt", "\n Welcome to Node.js");

// const data = fs.readFileSync("hello.txt", "utf-8");
// console.log(data);
