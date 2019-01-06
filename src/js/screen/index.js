import AirConsole from "../../../vendor/js/airconsole-1.7.0";

var airconsole = new AirConsole();

let winner;
let actions = {};

airconsole.onConnect = device_id => {
  actions[device_id] = "";
};

// Listen for messages from other devices
airconsole.onMessage = function(device_id, data) {
  // We receive a message -> Send message back to the device
  airconsole.message(device_id, "Recorded action!");

  if (actions[device_id] === "") {
    actions[device_id] = data;
  }

  // Show message on device screen
  var info = document.createElement("DIV");
  const allActionsEntered = Object.values(actions).every(value => value !== "");

  if (allActionsEntered) {
  }
  info.innerHTML = JSON.stringify(actions, undefined, 2);
  document.body.appendChild(info);
};
