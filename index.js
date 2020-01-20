const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

// Adds a new Project
server.post("/projects", (req, res) => {
  projects.push(req.body);
  return res.json(projects);
});

// Get all projects
server.get("/projects", (req, res) => {
  return res.json(projects);
});

// Changes project title
server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projectIndex = projects.findIndex(obj => obj.id == id);

  projects[projectIndex].title = title;

  return res.json(projects);
});

// Delete a project
server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  projectIndex = projects.findIndex(obj => obj.id == id);

  projects.splice(projectIndex, 1);

  return res.json(projects);
});

// Adds a task to a project
server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projectIndex = projects.findIndex(obj => obj.id == id);

  projects[projectIndex].tasks.push(title);

  return res.json(projects);
});

server.listen(3000);
