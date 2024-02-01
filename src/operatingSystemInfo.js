import fs from "fs";
import fsPromise from "fs/promises";
import maPath from "./navigationWorkingDirectory.js";
import path from "path";
import os from "os";

const args = process.argv.slice(2);
const userName = args[0].split("=")[1];

class OperatingSystemInfo {
  constructor() {}

  eol() {
    const defaultEOL = os.EOL;
    console.log(`${JSON.stringify(defaultEOL)}`);
    maPath.showCurrentPathMessage();
  }

  showHomeDirectory() {
    const homeDirectory = os.homedir();
    console.log(homeDirectory);
    maPath.showCurrentPathMessage();
  }

  showSystemUserName() {
    console.log(userName);
    maPath.showCurrentPathMessage();
  }

  showCPUArchitecture () {
    const cpuArchitecture = process.arch;
    console.log(cpuArchitecture);
    maPath.showCurrentPathMessage();
  }
}

export default new OperatingSystemInfo();
