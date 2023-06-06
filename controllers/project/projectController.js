const Project = require("../../models/Project");

async function addProject(req, res) {
  try {
    const result = await Project.create(req.body);
    console.log(result);
    res.status(201).json({ success: `New Project created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function createTicket(req, res) {
  const id = req.body.projectId;
  const data = req.body;
  
  try {
    const result = await Project.updateOne(
      { _id: id },
      { $set: { tickets: [data] } }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getProjects(req, res) {
  try {
    const result = await Project.find();
    res.status(201).json(result);
  } catch (e) {
    res.status(500).json({ message: err.message });
  }
}

async function getSingleProject(req, res) {
  const id = req.query.id;
  try {
    const result = await Project.findById(id);
    res.status(201).json(result);
  } catch (e) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { addProject, getProjects, getSingleProject, createTicket };
