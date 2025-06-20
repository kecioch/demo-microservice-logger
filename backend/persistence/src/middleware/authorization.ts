import express from "express";
import logger from "../logger/logger";

export const verifyAuthToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader?.startsWith("Bearer ")) {
    logger.warn("Missing or invalid Authorization header");
    res
      .status(401)
      .json({ message: "Missing or invalid Authorization header" });
    return;
  }

  const token = authHeader.split(" ")[1];
  const validToken = process.env.AUTH_TOKEN;

  if (token !== validToken) {
    logger.warn("Attempt authorize with invalid token");
    res.status(403).json({ message: "Invalid token" });
    return;
  }

  next();
};
