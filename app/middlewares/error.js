const logger = require('../logger/logger');

const statusCodes = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    NO_AUTHORIZED: 403 
};

exports.handle = (error, req, res, next) => {
    res.status(statusCodes[error.errorCode] || statusCodes["DEFAULT_ERROR"])
    logger.error(error);
    return res.send({
        message: error.message,
        internal_code: error.errorCode
    });
};