
// npm figlet for rendering logo in CLI
const figlet = require("figlet");

function renderFiglet(callback) {
  figlet.text(
    "Employee Tracker DB",
    {
      font: "ANSI Shadow",
      horizontalLayout: "fitted",
      verticalLayout: "fitted",
      width: 100,
      whitespaceBreak: true,
      colors: true,
    },
    function (err, data) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      console.log(data);
      if (typeof callback === "function") {
        callback();
      }
    }
  );
}

module.exports = renderFiglet;

