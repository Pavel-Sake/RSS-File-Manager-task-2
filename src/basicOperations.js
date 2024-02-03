import fs from "fs";
import fsPromise from "fs/promises";
import maPath from "./navigationWorkingDirectory.js";
import path from "path";
import { OPERATION_FAILED, INVALID_INPUT } from "./constants.js";

class BasicOperation {
  constructor() {}

  async readFile(args) {
    const numberOfArgs = args.length;

    if (numberOfArgs !== 1) {
      console.log(INVALID_INPUT);
      return;
    }

    try {
      const pathToFile = args[0];
      const pathToTargetFile = path.join(maPath.currentPath, pathToFile);
      const readableStream = fs.createReadStream(pathToTargetFile);
      readableStream.on("data", (chunk) => {
        console.log(`${chunk}`);
      });

      readableStream.on("end", () => {
        maPath.showCurrentPathMessage();
      });

      readableStream.on("error", (error) => {
        console.log(OPERATION_FAILED);
      });
    } catch (err) {
      console.log(OPERATION_FAILED);
    }
  }

  createEmptyFile(args) {
    const numberOfArgs = args.length;

    if (numberOfArgs !== 1) {
      console.log(INVALID_INPUT);
      return;
    }

    const filName = args[0];
    const pathToTargetFile = path.join(maPath.currentPath, filName);
    const pathToTargetDirectory = path.dirname(pathToTargetFile);
    console.log(pathToTargetDirectory);

    fs.access(pathToTargetDirectory, fs.constants.F_OK, (err) => {
      if (err) {
        console.log(INVALID_INPUT);
      } else {
        fs.appendFile(pathToTargetFile, "", (err) => {
          maPath.showCurrentPathMessage();
        });
      }
    });
  }

  async renameFile(args) {
    const numberOfArgs = args.length;

    if (numberOfArgs !== 2) {
      console.log(INVALID_INPUT);
      return;
    }

    const oldFileName = args[0];
    const newFileName = args[1];
    const pathToOldFile = path.join(maPath.currentPath, oldFileName);
    const pathToNewFileName = path.join(maPath.currentPath, newFileName);

    try {
      await fsPromise.access(pathToOldFile, fsPromise.constants.F_OK);
      await fsPromise.rename(pathToOldFile, pathToNewFileName);
      maPath.showCurrentPathMessage();
    } catch (err) {
      console.log(INVALID_INPUT);
    }
  }

  async copyFile(args) {
    const numberOfArgs = args.length;

    if (numberOfArgs !== 2) {
      console.log(INVALID_INPUT);
      return;
    }

    const nameOfFile = args[0];
    const pathToDirectory = args[1];

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
        console.log(OPERATION_FAILED);
      });

      destinationStream.on("error", (err) => {
        console.log(OPERATION_FAILED);
      });

      sourceStream.pipe(destinationStream);
      maPath.showCurrentPathMessage();
    } catch (err) {
      console.log(`Operation failed`);
    }
  }

  async moveFile(args) {
    const numberOfArgs = args.length;

    if (numberOfArgs !== 2) {
      console.log(INVALID_INPUT);
      return;
    }

    const nameOfFile = args[0];
    const pathToDirectory = args[1];

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
        console.log(OPERATION_FAILED);
      });

      destinationStream.on("error", (err) => {
        console.log(OPERATION_FAILED);
      });

      sourceStream.pipe(destinationStream);

      destinationStream.on("finish", () => {
        fsPromise.unlink(pathToOldFile);
        maPath.showCurrentPathMessage();
      });
    } catch (error) {
      console.log(INVALID_INPUT);
    }
  }

  async deleteFile(args) {
    const numberOfArgs = args.length;

    if (numberOfArgs !== 1) {
      console.log(INVALID_INPUT);
      return;
    }

    const nameOfFile = args[0];
    const pathToOldFile = path.join(maPath.currentPath, nameOfFile);

    try {
      await fsPromise.unlink(pathToOldFile);
      maPath.showCurrentPathMessage();
    } catch (error) {
      console.log(INVALID_INPUT);
    }
  }
}

export default new BasicOperation();
