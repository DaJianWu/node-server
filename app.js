const http = require('http');
const fs = require("fs");

const hostname = '127.0.0.1';
// const hostname = '0.0.0.0';
const port = 3000;

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "binary", (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    })
  })
};

const server = http.createServer((req, res) => {
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  // res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

  if (req.url.indexOf('/dist/') !== - 1) {
    console.log('读取静态文件中...');
    readFile('.' + req.url).then((data) => {
      res.write(data, "binary");
      res.end();
    })
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});