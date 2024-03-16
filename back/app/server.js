const express = require("express");
const cors = require("cors");
require('dotenv').config()
const mongoose = require("mongoose");
const { socketController } = require("../controllers/services/socketController");
mongoose.set("strictQuery", false);
const fileUpload = require('express-fileupload');

class Server {
    constructor() {
      this.app = express();
      this.middlewares();
  
      this.userRoutePath = "/api";
      this.apiFiles = "/api/file";
      this.apiMail = "/api/mail";
      
      this.serverExpress = require('http').createServer(this.app);
      this.serverWebSocket = require('http').createServer(this.app);
      this.io = require("socket.io")(this.serverWebSocket, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"],
          credentials: true
        }
      });
  
      this.conectarMongoose();
      this.routes();
      this.sockets()
    }
  
    conectarMongoose() {
      mongoose.connect(
        "mongodb://" +
          process.env.DB_MONGO_URL +
          ":" +
          process.env.DB_MONGO_PORT +
          "/" +
          process.env.DB_MONGO_DATABASE
          /**
           * En la consola salta un warning advirtiendo de que 
           * esos atributos están deprecated. 
           * 
           */
        //   ,
        // {
        //   useNewUrlParser: true,
        //   useUnifiedTopology: true,
        // }
      );
  
      this.db = mongoose.connection;
      this.db.on(
        "error",
        console.error.bind(console, "Error de conexión a MongoDB:")
      );
      this.db.once("open", () => {
        //console.log("Conexión exitosa a MongoDB");
      });
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
      this.app.use(this.apiFiles, require("../routes/services/uploadsRoutes"));
      this.app.use(this.userRoutePath, require("../routes/users/userRoutes"));
      this.app.use(this.userRoutePath, require("../routes/users/alergiasRoutes"));
      this.app.use(this.userRoutePath, require("../routes/news/newsRoutes"));
      this.app.use(this.userRoutePath, require("../routes/landing/clubRoutes"));
      this.app.use(this.userRoutePath, require("../routes/landing/contactRoutes"));
      this.app.use(this.userRoutePath, require("../routes/assetsRoutes"));
      this.app.use(this.apiMail, require("../routes/services/mailRoutes.js"));
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