import operatingSystemInfo from "./operatingSystemInfo.js";
import {
  INVALID_INPUT,
  NAVIGATION,
  BASIC_OPERATION,
  OPERATION_SYSTEM,
} from "./constants.js";

function controllerOS(arg) {
  const numberOfCommands = arg.length;
  const command = arg[0];

  if (numberOfCommands !== 1) {
    console.log(INVALID_INPUT);
    return;
  }

  switch (command) {
    case OPERATION_SYSTEM.EOL:
      operatingSystemInfo.eol();
      break;
    case OPERATION_SYSTEM.CPUS:
      operatingSystemInfo.cpu();
      break;
    case OPERATION_SYSTEM.HOMEDIR:
      operatingSystemInfo.showHomeDirectory();
      break;
    case OPERATION_SYSTEM.USERNAME:
      operatingSystemInfo.showSystemUserName();
      break;
    case OPERATION_SYSTEM.ARCHITECTURE:
      operatingSystemInfo.showCPUArchitecture();
      break;

    default:
      console.log(INVALID_INPUT);
  }
}

export default controllerOS;
