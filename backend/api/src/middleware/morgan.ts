import morgan from "morgan";
import logger from "../logger/logger";

export const morganMiddleware = morgan(
  ":remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms",
  {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  },
);
