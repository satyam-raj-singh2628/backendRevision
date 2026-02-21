const fs = require("fs");

function LogReqRes(filename) {
  return (req, res, next) => {
    console.log(`Logging request and response to file: ${filename}`);
    fs.appendFile(
      filename,
      `\nRequest: date-${Date.now()} method-${req.method} path-${req.path}`,
      (err) => {
        if (err) {
          console.error(`Error logging request: ${err}`);
        }
      },
    );

    next();
  };
}
module.exports = LogReqRes;
