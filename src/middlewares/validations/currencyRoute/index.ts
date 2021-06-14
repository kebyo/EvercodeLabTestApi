import express from 'express';
import nameChecker from './name';
import tickerChecker from './ticker';
import {HttpStatusCode} from '../../../utils/httpError';

/**
 * Middleware which validate body for '/currency' route
 *
 * @param req - request
 * @param res - response
 * @param next - next function
 */
export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const name: string = req.body.currency.name;
    const ticker: string = req.body.currency.ticker;

    const errorMessages: string[] = [];

    if (!nameChecker(name)) {
        errorMessages.push('name should be have length 1-20 and have only numbers or latin')
    }

    if (!tickerChecker(ticker)) {
        errorMessages.push('ticker should be have length 3-5 and have only numbers or latin')
    }

    if (errorMessages.length !== 0) {
        return res.status(HttpStatusCode.BadRequest).json({
            errors: errorMessages,
        });
    }

    next();
}