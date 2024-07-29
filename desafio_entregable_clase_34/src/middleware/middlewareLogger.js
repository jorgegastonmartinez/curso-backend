import { devLogger, prodLogger } from "../utils/logger.js";

const logger = process.env.NODE_ENV === 'production' ? prodLogger : devLogger;

export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    next();
};