const Project = require("../../models/Project");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

async function addProject(req, res) {
  try {
    const result = await Project.create(req.body);
    console.log(result);
    res.status(201).json({ success: `New Project created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function addProjectTicket(req, res) {
  const id = req.body.projectId;
  // const id = "647ebf20409b216e2d59695a";
  const data = req.body;

  try {
    const result = await Project.updateOne(
      { _id: new ObjectId(id) },
      { $push: { tickets: { ...data, _id: new mongoose.Types.ObjectId() } } }
    );
    console.log(result);
    const updatedProject = await Project.findById(id);
    res.send(updatedProject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
async function updateProjectTicketStatus(req, res) {
  const id = req.query.id;
  const status = req.body.status;
  console.log(id);
  try {
    const result = await Project.updateOne(
      { "tickets._id": new ObjectId(id) },
      { $set: { "tickets.$.status": status } }
    );
    return res.status(201).json({ result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function updateTicketDetails(req, res) {
  const id = req.query.id;
  console.log(req.body);

  try {
    const result = await Project.updateOne(
      { "tickets._id": new ObjectId(id) },
      {
        $set: {
          "tickets.$.issueType": req.body.issueType,
          "tickets.$.status": req.body.status,
          "tickets.$.description": req.body.description,
          "tickets.$.assignee": req.body.assignee,
          "tickets.$.reporter": req.body.reporter,
          "tickets.$.priority": req.body.priority,
          "tickets.$.title": req.body.title,
          "tickets.$.sprint": req.body.sprint,
        },
      }
    );
    return res.status(201).json({ result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function removeTicket(req, res) {
  const id = req.query.id;
  console.log(req.body);

  try {
    const result = await Project.updateOne(
      { _id: new ObjectId(req.body.projectId) },
      {
        $pull: {
          tickets: { _id: new ObjectId(id) },
        },
      }
    );
    return res.status(201).json({ result });
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
    res.status(500).json({ message: e.message });
  }
}

module.exports = {
  addProject,
  getProjects,
  getSingleProject,
  addProjectTicket,
  updateProjectTicketStatus,
  updateTicketDetails,
  removeTicket,
};
