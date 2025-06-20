import { NextFunction, Request, Response } from "express";
import { createRequestID } from "../services/request";

export const generateRequestId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const requestId = createRequestID();
  
  // Attach to request object
  req.requestID = requestId;

  // Set header
  res.setHeader("x-request-id", requestId);

  next();
};
