import path from "path";
import crypto from "crypto";
import fs from "fs";
import maPath from "./navigationWorkingDirectory.js";

import { INVALID_INPUT, OPERATION_FAILED } from "./constants.js";

class HashCalculation {
  constructor() {}

  calculateHash(args) {
    const numberOfCommands = args.length;

    if (numberOfCommands !== 1) {
      console.log(INVALID_INPUT);
      return;
    }

    const fileName = args[0];
    const pathToTargetFile = path.join(maPath.currentPath, fileName);

    const hash = crypto.createHash("sha256");
    const fileStream = fs.createReadStream(pathToTargetFile);

    fileStream.on("data", (data) => {
      hash.update(data);
    });

    fileStream.on("end", () => {
      const hashResult = hash.digest("hex");
      console.log(`SHA256 Hash of : ${hashResult}`);
      maPath.showCurrentPathMessage();
    });

    fileStream.on("error", (error) => {
      console.log(OPERATION_FAILED);
    });
  }
}

export default new HashCalculation();
