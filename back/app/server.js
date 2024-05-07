const express = require("express");
const cors = require("cors");
require('dotenv').config()
const { socketController } = require("../controllers/services/socketController");
const fileUpload = require('express-fileupload');

class Server {
    constructor() {
      this.app = express();
      this.middlewares();
  
      this.RoutePath = "/api";
      this.apiFiles = "/api/file";
      this.apiMail = "/api/mail";
      this.apiRols = "/api/rols"
      this.apiEvents = "/api/events"
      
      this.serverExpress = require('http').createServer(this.app);
      this.serverWebSocket = require('http').createServer(this.app);
      this.io = require("socket.io")(this.serverWebSocket, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"],
          credentials: true
        }
      });
  
      this.routes();
      this.sockets()
    }
  
    middlewares() {
      this.app.use(cors({
        origin: process.env.FRONT_URL,
        credentials: true,
      }));
      this.app.use(express.json());
  
      this.app.use( fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/',
        createParentPath: true
    }));
    }
  
    routes() {
      this.app.use(this.RoutePath, require("../routes/users/userRoutes"));
      this.app.use(this.apiMail, require('../routes/services/mailRoutes'));
      this.app.use(this.apiRols, require('../routes/rols/rolRoutes'));
      this.app.use(this.apiEvents, require('../routes/events/eventsRoutes'));
    }
  
    sockets() {
      this.io.on("connection", socketController);
    }
  
    listen() {
      this.app.listen(process.env.PORT, () => {
        //console.log(`Servidor escuchando en: ${process.env.PORT}`);
      });
  
      this.serverWebSocket.listen(process.env.WEBSOCKETPORT, () => {
        //console.log(`Servidor de WebSockets escuchando en: ${process.env.WEBSOCKETPORT}`);
      }); 
    }
 }
  
 module.exports = Server;