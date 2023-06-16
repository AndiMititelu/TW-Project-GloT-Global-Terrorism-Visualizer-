const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  /*  <<-- HOMEPAGE LOADING -->> */
  if (req.url === '/home') {
    const loadHome = new Promise((resolve, reject) => {
      const filePath = path.join(process.cwd(), '../view/index.html');
      fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
          reject();
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);

        resolve();
      });
    });

  /*  <<-- STATIC LOADING -->> */
  } else if(req.url.includes('static')) {
    const loadStatic = new Promise((resolve, reject) => {
      const filePath = path.join(process.cwd(), '../', req.url);
      let mimeType = path.extname(filePath)
      let contentType = '';
      // load various file types

      switch (mimeType) {
          case '.png': contentType = 'image/png'; break;
          case '.jpg': contentType = 'image/jpg'; break;
          case '.jpeg': contentType = 'image/jpeg'; break;
          case '.js': contentType = 'text/javascript'; break;
      }
      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
          reject();
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);

        resolve();
    });
    })
   }
});


const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});