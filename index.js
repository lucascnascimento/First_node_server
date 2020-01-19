const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

server.post("/projects", (req, res) => {
  projects.push(req.body);
  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

// server.delete("/projects", (req, res) => {
//   return res.json("hello res");
// });

// server.update("/projects", (req, res) => {
//   return res.json("hello res");
// });

server.listen(3000);
