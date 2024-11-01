//1 Imports
const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");
const userRouters = require("./users/user-router")

//2 Middlewares
server.use(helmet());
server.use(express.json());
server.use(cors());

//3 Routes
server.use('/api/users',userRouters)
//4 Errors
server.use((err,req,res,next)=>{
  res.status(err.status || 500)
      .json({message: err.message || "Server error!..."})
})

//5 Exports

module.exports = server;