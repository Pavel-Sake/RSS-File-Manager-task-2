import path from "path";
import crypto from "crypto";
import fs from "fs";
import maPath from "./navigationWorkingDirectory.js";

class HashCalculation {
  constructor() {}

  calculateHash(nameOfFile) {
    const pathToTargetFile = path.join(maPath.currentPath, nameOfFile);

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
        console.log(`Operation failed`);
      });
  }
}

export default new HashCalculation();
