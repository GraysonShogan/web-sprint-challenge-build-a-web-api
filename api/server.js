const express = require("express");
const server = express();

const actionRouter = require("./actions/actions-router");
const projectRouter = require("./projects/projects-router");

server.use(express.json());

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.get("/", (req, res) => {
  console.log("The server sure is going");
});

module.exports = server;
