import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";
import os from "os";

const homeDirectory = os.homedir();
let initialPath = path.join(homeDirectory);
const partOfPathMessage = `You are currently in `;

class Path {
  constructor(initialPath) {
    this.currentPath = initialPath;
  }

  upPath() {
    this.currentPath = path.join(this.currentPath, "..");
    this.showCurrentPathMessage();
  }

  showCurrentPathMessage() {
    console.log(partOfPathMessage + this.currentPath);
  }

  async changePath(pathToTarget) {
    const newPath = path.join(this.currentPath, pathToTarget);
    try {
      await fs.access(newPath);
      this.currentPath = path.join(newPath);
      this.showCurrentPathMessage();
    } catch (err) {
      console.log("Operation failed");
    }
  }

  async showAllInDirectory() {
    const folderInfo = [];
    const fileInfo = [];

    try {
      const files = await fs.readdir(this.currentPath);

      files.forEach(async (file, index) => {
        const pathToFile = path.join(this.currentPath, file);
        const stats = await fs.stat(pathToFile);
        

        if (stats.isFile()) {
          let nameOfEntity = "file";
          const fileStats = {
            name: file,
            Type: nameOfEntity,
          };
          fileInfo.push(fileStats);
        } else if (stats.isDirectory()) {
          let nameOfEntity = "directory";
          const directoryStats = {
            name: file,
            Type: nameOfEntity,
          };
          folderInfo.push(directoryStats);
        }

        if (index + 1 === files.length) {
          const sortedFolderInfo = folderInfo.sort(sortAlphabetical);
          const sortedFileInfo = fileInfo.sort(sortAlphabetical);

          const resSorted = [...sortedFolderInfo, ...sortedFileInfo];

          console.table(resSorted);

          this.showCurrentPathMessage();
        }
      });
    } catch (err) {
      console.log(err);
    }
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

export default new Path(initialPath);
