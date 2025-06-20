require("dotenv").config();

import app from "./app";
import config from "./config/config";
import { PrismaClient } from "./generated/prisma";
import logger from "./logger/logger";

export const prisma = new PrismaClient();

app.listen(config.port, () => {
  logger.info(`Persistence-Server running on port ${config.port}`);
});
