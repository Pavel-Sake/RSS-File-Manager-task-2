import myPath from "./navigationWorkingDirectory.js";
import basicOperations from "./basicOperations.js";
import operatingSystemInfo from "./operatingSystemInfo.js"

const args = process.argv.slice(2);
const userName = args[0].split("=")[1];
const EXIT = ".exit";
const UP = "up";

const greetingMessage = `Welcome to the File Manager, ${userName} !`;
const partingMessage = `Thank you for using File Manager, ${userName}, goodbye`;

const currentPath = `You are currently in ${myPath.currentPath}`;

function startFileManager() {
  console.log(greetingMessage);
  myPath.showCurrentPathMessage();

  process.stdin.on("data", (data) => {
    const receivedData = data.toString().trim();

    if (receivedData === EXIT) {
      process.kill(process.pid, "SIGINT");
      myPath.showCurrentPathMessage();
    }

    if (receivedData === UP) {
      myPath.upPath();
    }

    const dataCd = receivedData.split(" ");

    if (dataCd[0] === "cd") {
       myPath.changePath(dataCd[1]);
    }

    if (dataCd[0] === "ls") {
      myPath.showAllInDirectory()
    }

    if (dataCd[0] === "cat") {
      basicOperations.readFile(dataCd[1])
    }

    if (dataCd[0] === "add") {
      basicOperations.createEmptyFile(dataCd[1])
    }

    if (dataCd[0] === "rn") {
      basicOperations.renameFile(dataCd[1], dataCd[2])
    }
    if (dataCd[0] === "cp") {
      basicOperations.copyFile(dataCd[1], dataCd[2])
    }
    if (dataCd[0] === "mv") {
      basicOperations.moveFile(dataCd[1], dataCd[2])
    }

    if (dataCd[0] === "rm") {
      basicOperations.deleteFile(dataCd[1])
    }

    if (dataCd[0] === "os") {
      operatingSystemInfo.showCPUArchitecture()
    }

    //myPath.showCurrentPathMessage();
  });

  process.on("SIGINT", () => {
    console.log(partingMessage);

    process.stdin.end();

    process.exit();
  });
}

startFileManager();



