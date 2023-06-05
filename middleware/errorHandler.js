const { logEvents } = require("./logEvents");
const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name} ${err.message}\t `, 'errLog.txt');
  console.log(err.stack);
};

module.exports = errorHandler
