const fs = require('fs');


const requestHandler = (req, res) => {
  // console.log(req.url, req.method, req.headers);
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title><head>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return req.on('end', () => {
      const parasedBody = Buffer.concat(body).toString();
      console.log(parasedBody);
      let message = parasedBody.split('=')[1];
      fs.writeFile('./message.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }

  res.setHeader('Content-Type', 'text/html');
  //write allows to write some data to responses
  res.write('<html>');
  res.write('<head><title>My First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  //keep in mind when you write end then you don't able to write again. if you try to write you can get error.
  res.end();
};


// module.exports = {
//   handler: requestHandler, 
//   handlertext: "It's handle the incoming reqest"
// };

// module.exports.handler = requestHandler; 
// module.exports.handlertext = "Some hard coded text";
exports.handler = requestHandler; 
exports.handlertext = "Some hard coded text";

