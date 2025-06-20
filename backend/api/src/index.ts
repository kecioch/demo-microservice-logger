require("dotenv").config();

import app from "./app";
import config from "./config/config";
import logger from "./logger/logger";

app.listen(config.port, () => {
  logger.info(`API-Server running on port ${config.port}`);
});