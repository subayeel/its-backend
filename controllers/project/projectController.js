const Manager = require("../../models/Manager");
const Project = require("../../models/Project");
const Developers = require("../../models/Developer");
const mongoose = require("mongoose");
const jwtDecode = require("jwt-decode");
const Developer = require("../../models/Developer");
const { ObjectId } = mongoose.Types;

async function addProject(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwtDecode(token);
  const employeesId = req.body.employees?.map((emp) => emp.userId);
  try {
    //Get the maanger id from accesstoken
    const manager = await Manager.findOne({
      _id: decoded.UserInfo.userId,
    }).exec();

    //create project with managerID
    const result = await Project.create({
      ...req.body,
      managerId: decoded.UserInfo.userId,
    });

    //store project in manager Document
    manager?.projects.push(result);
    await manager.save();

    //get All Developers with maangerId as filter
    const devs = await Developer.updateMany(
      {
        _id: { $in: employeesId },
      },
      {
        $push: {
          projectsAssigned: result,
        },
      }
    ).exec();
    console.log(devs);

    //push this project if username matches with req.body.username
    //Store Project in all linked Developers
    // devs.map((dev) => {
    //   if (employeesId.includes(dev.userId)) {
    //     dev.projectsAssigned.push(result);
    //   } else {
    //     return;
    //   }
    //   return dev;
    // });

    // const devResponse = await devs.save();

    // console.log(devResponse);
    res.status(201).json({ success: `New Project created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function deleteProject(req, res) {
  const projId = req.params.id;
  // const token = req.headers.authorization.split(" ")[1];
  // const decoded = jwtDecode(token);

  // res.send("sss");
  const dev = await Project.deleteOne({ _id: projId });

  res.json(dev);
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

    const updatedProject = await Project.findById(id);

    //get assignee of project

    console.log(req.body);
    const devResult = await Developer.updateOne(
      { fullName: req.body.assignee },
      { $push: { ticketsAssigned: { ...data, _id: new mongoose.Types.ObjectId() } } }
    );

    console.log(devResult);

    //Add ticket to that assignee
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
  // const mangerId = req.body.managerId;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwtDecode(token);
  try {
    const result = await Project.find({ managerId: decoded.UserInfo.userId });
    res.status(201).json(result);
  } catch (err) {
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
  deleteProject,
  getProjects,
  getSingleProject,
  addProjectTicket,
  updateProjectTicketStatus,
  updateTicketDetails,
  removeTicket,
};
