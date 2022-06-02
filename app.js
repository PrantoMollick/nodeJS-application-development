const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // console.log(req.url, req.method, req.headers);



    const method = req.method;
    const url = req.url;
    if( url === '/') {
        res.write(
          '<html><header><title>Send to message</title></header><body><form action="/message" method="post"> <input type="text"> <button type="submit">Submit</button></form></body></html>'
        );
        return res.end();
    }

    if(url === '/message' && method === 'POST') {
      fs.appendFileSync('./message.txt', 'Dummy', 'utf8');
      res.statusCode = 302;
      res.setHeader('Location', '/');
      return res.end();
    }

    res.setHeader('Content-Type', 'text/html');
    //write allows to write some data to responses
    res.write('<html><header><title>This is our new page</title></header><body><h1>We write something for response.</h1></body></html>');
    //keep in mind when you write end then you don't able to write again. if you try to write you can get error. 
    res.end();
});


server.listen(3000);


