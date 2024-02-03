import path from "path";
import fs from "fs/promises";
import os from "os";
import {
  OPERATION_FAILED,
  INVALID_INPUT,
  MESSAGE_CURRENT_PATH,
} from "./constants.js";

const homeDirectory = os.homedir();
let initialPath = path.join(homeDirectory);
const oneArgument = 1;

function getArraysWithData(fileArr, folderArr, stats, file) {
  if (stats.isFile()) {
    let nameOfEntity = "file";
    const fileStats = {
      name: file,
      Type: nameOfEntity,
    };
    fileArr.push(fileStats);
  } else if (stats.isDirectory()) {
    let nameOfEntity = "directory";
    const directoryStats = {
      name: file,
      Type: nameOfEntity,
    };
    folderArr.push(directoryStats);
  }
}

function sortAlphabetical(a, b) {
  if (a.name < b.name) {
    return -1;
  }

  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

class Path {
  constructor(initialPath) {
    this.currentPath = initialPath;
  }

  upPath(arg) {
    const isArgsExist = arg.length;
    if (!isArgsExist) {
      this.currentPath = path.join(this.currentPath, "..");
      this.showCurrentPathMessage();
    } else {
      console.log(INVALID_INPUT);
    }
  }

  showCurrentPathMessage() {
    console.log(MESSAGE_CURRENT_PATH + this.currentPath);
  }

  async changePath(args) {
    try {
      const numberOfArgs = args.length;

      if (numberOfArgs !== oneArgument) {
        throw new Error();
      }

      const pathToTarget = args[0];
      const newPath = path.join(this.currentPath, pathToTarget);
      await fs.access(newPath, fs.constants.F_OK);
      this.currentPath = path.join(newPath);
      this.showCurrentPathMessage();
    } catch (err) {
      err.message = INVALID_INPUT;
      console.log(err.message);
    }
  }

  async showAllInDirectory(args) {
    const isArgsExist = args.length;

    if (isArgsExist) {
      console.log(INVALID_INPUT);
      return;
    }

    try {
      const folderInfo = [];
      const fileInfo = [];
      const files = await fs.readdir(this.currentPath);

      files.forEach(async (file, index) => {
        const pathToFile = path.join(this.currentPath, file);
        const stats = await fs.stat(pathToFile);

        getArraysWithData(fileInfo, folderInfo, stats, file);

        if (index + 1 === files.length) {
          const sortedFolderInfo = folderInfo.sort(sortAlphabetical);
          const sortedFileInfo = fileInfo.sort(sortAlphabetical);
          const resSorted = [...sortedFolderInfo, ...sortedFileInfo];
          console.table(resSorted);
          this.showCurrentPathMessage();
        }
      });
    } catch (err) {
      console.log(OPERATION_FAILED);
    }
  }
}

export default new Path(initialPath);
