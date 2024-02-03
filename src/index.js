import myPath from "./navigationWorkingDirectory.js";
import commandController from "./commandController.js";

const args = process.argv.slice(2);
const userName = args[0].split("=")[1];
const EXIT = ".exit";

const greetingMessage = `Welcome to the File Manager, ${userName} !`;
const partingMessage = `Thank you for using File Manager, ${userName}, goodbye`;

function closeFileManager(command, process) {
  if (command === EXIT) {
    process.kill(process.pid, "SIGINT");
    myPath.showCurrentPathMessage();
  }
}

function startFileManager() {
  console.log(greetingMessage);
  myPath.showCurrentPathMessage();

  process.stdin.on("data", (data) => {
    const receivedCommand = data.toString().trim();

    closeFileManager(receivedCommand, process);

    commandController(receivedCommand);
  });

  process.on("SIGINT", () => {
    console.log(partingMessage);

    process.stdin.end();

    process.exit();
  });
}

startFileManager();
