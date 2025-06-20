import winston from "winston";

const LogstashTransport = require("winston-logstash/lib/winston-logstash-latest");
const Elasticsearch = require("winston-elasticsearch");

const { combine, timestamp, json, printf, colorize, align, errors } = winston.format;

const esTransportOpts = {
  level: "http",
  clientOpts: {
    node: process.env.ELASTIC_URL,
  },
  indexPrefix: "auftragsverwaltung-logs",
};

const logstashTransportOpt = {
  host: process.env.LOGSTASH_HOST,
  port: process.env.LOGSTASH_PORT,
};

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "http",
  //   format: winston.format.json(),
  //   format: winston.format.cli(),
  format: combine(errors({ stack: true }), timestamp(), json()),
  //   format: combine(
  //     colorize({ all: true }),
  //     timestamp({
  //       format: "YYYY-MM-DD hh:mm:ss.SSS A",
  //     }),
  //     align(),
  //     printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
  //   ),
  defaultMeta: {
    service: process.env.SERVICE_NAME,
    buildDetails: {
      nodeVersion: process.version,
    },
  },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "./logs/combined.log",
    }),
    new winston.transports.File({
      filename: "./logs/app-error.log",
      level: "error",
    }),
    // new Elasticsearch.ElasticsearchTransport(esTransportOpts),
    new LogstashTransport(logstashTransportOpt),
  ],
});

export const errorLogger = (message: string, error: any, requestID?: string) => {
  const childLogger = logger.child({
    requestID,
  });
  childLogger.error(message, error);
};

export default logger;
