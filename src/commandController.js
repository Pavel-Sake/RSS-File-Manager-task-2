import navigation from "./navigationWorkingDirectory.js";
import basicOperations from "./basicOperations.js";

import controllerOS from "./controllerOS.js";
import hashCalculation from "./hashCalculation.js";
import compressDecompress from "./compressDecompress.js";
import {
  INVALID_INPUT,
  NAVIGATION,
  BASIC_OPERATION,
  OPERATION_SYSTEM,
  HASH_CALCULATION,
  ARCHIVING,
} from "./constants.js";

function commandController(command) {
  const arrayOfCommand = command.split(" ");
  const [nameOfCommand, ...args] = arrayOfCommand;

  switch (nameOfCommand) {
    case NAVIGATION.UP:
      navigation.upPath(args);
      break;
    case NAVIGATION.CD:
      navigation.changePath(args);
      break;
    case NAVIGATION.LS:
      navigation.showAllInDirectory(args);
      break;
    case BASIC_OPERATION.CAT:
      basicOperations.readFile(args);
      break;
    case BASIC_OPERATION.ADD:
      basicOperations.createEmptyFile(args);
      break;
    case BASIC_OPERATION.RN:
      basicOperations.renameFile(args);
      break;
    case BASIC_OPERATION.CP:
      basicOperations.copyFile(args);
      break;
    case BASIC_OPERATION.MV:
      basicOperations.moveFile(args);
      break;
    case BASIC_OPERATION.RM:
      basicOperations.deleteFile(args);
      break;
    case OPERATION_SYSTEM.OS:
      controllerOS(args);
      break;
    case HASH_CALCULATION.HASH:
      hashCalculation.calculateHash(args);
      break;
    case ARCHIVING.COMPRESS:
      compressDecompress.compress(args);
      break;
    case ARCHIVING.DECOMPRESS:
      compressDecompress.decompress(args);
      break;
    default:
      console.log(INVALID_INPUT);
  }
}

export default commandController;
