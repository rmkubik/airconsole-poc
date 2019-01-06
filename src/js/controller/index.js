import AirConsole from "../../../vendor/js/airconsole-1.7.0";

var airconsole = new AirConsole();

document.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", () => {
    airconsole.message(AirConsole.SCREEN, button.id);
  });
});

// Listen for messages
airconsole.onMessage = function(from, data) {
  // Show message on device screen
  var info = document.createElement("DIV");
  info.innerHTML = data;
  document.body.appendChild(info);
};