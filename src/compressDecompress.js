import path from "path";
import maPath from "./navigationWorkingDirectory.js";
import fs from "fs";
import fsPromise from "fs/promises";
import zlib from "zlib";

const EXTENSION_FOR_COMPRESS = ".br";

function getPathToTargets(nameOfFile, destination) {
  const pathToTargetFile = path.join(maPath.currentPath, nameOfFile);
  const pathToTaDestination = path.join(maPath.currentPath, destination);

  return { pathToTargetFile, pathToTaDestination };
}

async function checkIsPathsExist(pathToTargetFile, pathToTaDestination) {
  const targetFileStats = await fsPromise.stat(pathToTargetFile);
  const destinationStats = await fsPromise.stat(pathToTaDestination);

  const isTargetFileExist = targetFileStats.isFile();
  const isTargetDirectoryExist = destinationStats.isDirectory();

  if (isTargetFileExist && isTargetDirectoryExist) {
    return true;
  }

  return false;
}

class CompressDecompress {
  constructor() {}

  async compress(nameOfFile, destination) {
    try {
      const { pathToTargetFile, pathToTaDestination } = getPathToTargets(
        nameOfFile,
        destination
      );

      const isPathsExist = await checkIsPathsExist(
        pathToTargetFile,
        pathToTaDestination
      );

      if (isPathsExist) {
        const fileNameWithoutExtension = path.basename(
          pathToTargetFile,
          path.extname(pathToTargetFile)
        );
        const fileNameWithCompress = `${fileNameWithoutExtension}_c${EXTENSION_FOR_COMPRESS}`;
        const pathToFileOutput = path.join(
          pathToTaDestination,
          fileNameWithCompress
        );

        const readStream = fs.createReadStream(pathToTargetFile);
        const writeStream = fs.createWriteStream(pathToFileOutput);

        const brotliStream = zlib.createBrotliCompress();

        readStream.pipe(brotliStream).pipe(writeStream);

        readStream.on("error", handleError);
        brotliStream.on("error", handleError);

        writeStream.on("finish", () => {
          console.log("File compressed successfully.");
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      handleError();
    }
  }

  async decompress(nameOfFile, destination) {
    try {
      const { pathToTargetFile, pathToTaDestination } = getPathToTargets(
        nameOfFile,
        destination
      );

      const isPathsExist = await checkIsPathsExist(
        pathToTargetFile,
        pathToTaDestination
      );

      if (isPathsExist) {
        const fileNameWithoutExtension = path.basename(
          pathToTargetFile,
          path.extname(pathToTargetFile)
        );
        const fileNameWithCompress = `${fileNameWithoutExtension}_d.txt`;
        const pathToFileOutput = path.join(
          pathToTaDestination,
          fileNameWithCompress
        );

        const readStream = fs.createReadStream(pathToTargetFile)
        const writeStream = fs.createWriteStream(pathToFileOutput)

        const brotliStream = zlib.createBrotliDecompress()

        readStream.pipe(brotliStream).pipe(writeStream)

        readStream.on("error", handleError)
        writeStream.on("error", handleError)

        brotliStream.on("finish", () => {
          console.log("File compressed successfully.");
        })

      } else {
        throw new Error();
      }
    } catch (error) {
      handleError();
    }
  }
}

function handleError(err) {
  console.log("Operation failed");
}

export default new CompressDecompress();
