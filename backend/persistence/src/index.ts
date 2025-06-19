require('dotenv').config();

import app from './app';
import config from './config/config';
import { PrismaClient } from './generated/prisma';

export const prisma = new PrismaClient();

app.listen(config.port, () => {
  console.log(`Persistence-Server running on port ${config.port}`);
});