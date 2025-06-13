import ConfigConstants from "../../../constants/ConfigConstants";
import { LogTypes } from "../../../constants/AppConstants";

export const Logger = (message?: any, value?: any, logType?: string) => {
  let isLoggerEnabled = ConfigConstants.isLoggerDisplay;
  if (isLoggerEnabled) {
    let logString = `${message} ${value ? JSON.stringify(value) : ""}`;
    switch (logType) {
      case LogTypes.ERROR:
        console.error(logString);
        break;
      case LogTypes.WARNING:
        console.warn(logString);
        break;
      default:
        console.info(logString);
    }
    return logString;
  } else {
    return "";
  }
};
