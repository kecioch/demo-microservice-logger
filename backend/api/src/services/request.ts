const { v4: uuidv4 } = require("uuid");

export const createRequestID = () => {
  return uuidv4();
};
