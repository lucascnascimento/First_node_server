const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

let count = 0;

// Middleware for id validation
function checkIdExists(req, res, next) {
  const { id } = req.params;

  if (projects.findIndex(obj => obj.id == id) == -1) {
    return res.status(400).json({ error: "Project id does not exist" });
  }

  return next();
}

// Middleware that counts how many requests were made
function countRequest(req, res, next) {
  count++;
  console.log(`Requests made: ${count}`);

  return next();
}

// Adds a new Project
server.post("/projects", countRequest, (req, res) => {
  projects.push(req.body);
  return res.json(projects);
});

// Get all projects
server.get("/projects", countRequest, (req, res) => {
  return res.json(projects);
});

// Changes project title
server.put("/projects/:id", checkIdExists, countRequest, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projectIndex = projects.findIndex(obj => obj.id == id);

  projects[projectIndex].title = title;

  return res.json(projects);
});

// Delete a project
server.delete("/projects/:id", checkIdExists, countRequest, (req, res) => {
  const { id } = req.params;

  projectIndex = projects.findIndex(obj => obj.id == id);

  projects.splice(projectIndex, 1);

  return res.json(projects);
});

// Adds a task to a project
server.post("/projects/:id/tasks", checkIdExists, countRequest, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projectIndex = projects.findIndex(obj => obj.id == id);

  projects[projectIndex].tasks.push(title);

  return res.json(projects);
});

server.listen(3000);
