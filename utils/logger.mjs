import winston from "winston";

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}] : ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(), // show the log in the console
    ],
});

export default logger;