const http = require('http');
const url = require('url');
const query = require('querystring');
const fs = require('fs');
const apiHandler = require('./apiResponses.js');
// const xmlHandler = require('./xmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const stylesheet = fs.readFileSync(`${__dirname}/../client/style.css`);

// getIndex()
const getIndex = (rq, rp) => {
  rp.writeHead(200, { 'Content-Type': 'text/html' });
  rp.write(index);
  rp.end();
};

// getStylesheet()
const getStylesheet = (rs, rp) => {
  rp.writeHead(200, { 'Content-Type': 'text/css' });
  rp.write(stylesheet);
  rp.end();
};

// The URL Struct
const urlStruct = {
  '/': getIndex,
  '/style.css': getStylesheet,
  '/success': apiHandler.success,
  '/badRequest': apiHandler.badRequest,
  '/unauthorized': apiHandler.unauthorized,
  '/forbidden': apiHandler.forbidden,
  '/internal': apiHandler.internal,
  '/notImplemented': apiHandler.notImplemented,
  notFound: apiHandler.notFound,
};

// onRequest()
const onRequest = (request, response) => {
  console.log(request.url);
  // Parsing the URL + parameters
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, params);
  } else {
    urlStruct.notFound(request, response, params);
  }
};

// Running the server
http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1:${port}...`);
