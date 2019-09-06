const http = require('http'); //IMPORT HTTP PACKAGE
const app = require('./app');
const port = process.env.PORT || 3000; //DEFINE PORT
const server = http.createServer(app);

server.listen(port);