const Ticket = require("../../models/Ticket");

async function addTicket(req, res) {
  try {
    const result = await Ticket.create(req.body);
    console.log(result);
    res.status(201).json({ success: `New Ticket created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getTickets(req, res) {
  try {
    const result = await Ticket.find();
    res.status(201).json(result);
  } catch (e) {
    res.status(500).json({ message: err.message });
  }
}
async function updateTicketStatus(req, res) {
  const id = req.query.id;
  const status = req.body.status;
  console.log("status updt",id);
  const ticket = await Ticket.findById(id).exec();
  ticket.status = status;
  const result = await ticket.save();
  return res.json(result);
}

module.exports = {
  addTicket,
  getTickets,
  updateTicketStatus,
  
};
