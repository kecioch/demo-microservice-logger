import app from './app';
import config from './config/config';
import express from "express";
import { PrismaClient } from './generated/prisma';

export const prisma = new PrismaClient();

app.use(express.json());

app.listen(config.port, () => {
  console.log(`Persistence-Server running on port ${config.port}`);
});