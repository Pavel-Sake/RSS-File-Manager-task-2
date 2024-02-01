import fs from "fs";
import fsPromise from "fs/promises";
import maPath from "./navigationWorkingDirectory.js";
import path from "path";

class BasicOperation {
  constructor() {}

  async readFile(pathToFile) {
    try {
      const pathToTargetFile = path.join(maPath.currentPath, pathToFile);

      const readableStream = fs.createReadStream(pathToTargetFile);
      readableStream.on("data", (chunk) => {
        console.log(`${chunk}`);
      });

      readableStream.on("end", () => {
        maPath.showCurrentPathMessage();
      });

      readableStream.on("error", (error) => {
        console.error(`Operation failed`);
      });
    } catch (err) {
      console.error(`Operation failed`);
    }
  }

  createEmptyFile(nameOfFile) {
    const pathToTargetFile = path.join(maPath.currentPath, nameOfFile);

    fs.access(pathToTargetFile, fs.constants.F_OK, (err) => {
      if (err) {
        fs.appendFile(pathToTargetFile, "", (err) => {
          maPath.showCurrentPathMessage();
        });
      } else {
        console.log(`Operation failed`);
      }
    });
  }

  async renameFile(oldNameOfFile, newNameOfFile) {
    const pathToOldFile = path.join(maPath.currentPath, oldNameOfFile);
    const pathToNewtFile = path.join(maPath.currentPath, newNameOfFile);

    try {
      await fsPromise.rename(pathToOldFile, pathToNewtFile);
    } catch (err) {
      console.log(`Operation failed`);
    }
  }

  async copyFile(nameOfFile, pathToDirectory) {
    const pathToOldFile = path.join(maPath.currentPath, nameOfFile);
    const pathToNewtDirectory = path.join(maPath.currentPath, pathToDirectory);
    const pathToNewtFile = path.join(
      maPath.currentPath,
      pathToDirectory,
      nameOfFile
    );

    try {
      await fsPromise.access(pathToNewtDirectory, fsPromise.constants.F_OK);
      await fsPromise.access(pathToOldFile, fsPromise.constants.F_OK);

      const sourceStream = fs.createReadStream(pathToOldFile);
      const destinationStream = fs.createWriteStream(pathToNewtFile);

      sourceStream.on("error", (err) => {
        console.log(`Operation failed`);
      });

      destinationStream.on("error", (err) => {
        console.log(`Operation failed`);
      });

      sourceStream.pipe(destinationStream);
      maPath.showCurrentPathMessage();
    } catch (err) {
      console.log(`Operation failed`);
    }
  }

  async moveFile(nameOfFile, pathToDirectory) {
    const pathToOldFile = path.join(maPath.currentPath, nameOfFile);
    const pathToNewtDirectory = path.join(maPath.currentPath, pathToDirectory);
    const pathToNewtFile = path.join(
      maPath.currentPath,
      pathToDirectory,
      nameOfFile
    );

    try {
      await fsPromise.access(pathToNewtDirectory, fsPromise.constants.F_OK);
      await fsPromise.access(pathToOldFile, fsPromise.constants.F_OK);

      const sourceStream = fs.createReadStream(pathToOldFile);
      const destinationStream = fs.createWriteStream(pathToNewtFile);
      sourceStream.on("error", (err) => {
        console.log(`Operation failed`);
      });

      destinationStream.on("error", (err) => {
        console.log(`Operation failed`);
      });

      sourceStream.pipe(destinationStream);
      maPath.showCurrentPathMessage();

      destinationStream.on("finish", () => {
        fsPromise.unlink(pathToOldFile);
      });
    } catch (error) {
      console.log(`Operation failed`);
    }
  }

 async deleteFile(nameOfFile) {
    const pathToOldFile = path.join(maPath.currentPath, nameOfFile);

    try {
        await fsPromise.unlink(pathToOldFile);
        maPath.showCurrentPathMessage();
        
    } catch (error) {
        console.log(`Operation failed`);
    }
  }
}

export default new BasicOperation();
