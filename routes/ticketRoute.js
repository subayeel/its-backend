const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticket/ticketController");

router
  .post("/", ticketController.addTicket)
  .get("/", ticketController.getTickets)
  .put("/updatestatus", ticketController.updateTicketStatus);

module.exports = router;
