import express from 'express';
import HttpError, {HttpStatusCode} from '../utils/httpError';

/**
 * Route error
 *
 * @param req - request
 * @param res - response
 * @param next - next function
 */
export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const error: HttpError = new HttpError(HttpStatusCode.NotFound, 'Route not Found');

    res.status(error.status).json({
        error: error.message,
    }).send();
}
