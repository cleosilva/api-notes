import logger from '../utils/logger.mjs'

export default function logMiddleware(req, res, next) {
    logger.info(`${req.method} ${req.url}`);
    next();
}
