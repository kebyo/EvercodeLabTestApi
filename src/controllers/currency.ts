import express from 'express';
import CurrencyService from '../services/currency';
import Currency from '../types/currency';
import HttpError, {HttpStatusCode} from '../utils/httpError';

/**
 * Currency controller
 */
export default class CurrencyController {
    /**
     * Find all currencies
     *
     * @param req - request
     * @param res - response
     */
    public static findAll(req: express.Request, res: express.Response) {
        const queryParams = req.query as any;

        if (queryParams?.search) {
            const search: string = queryParams.search!;

            try {
                const currency = CurrencyService.search(search);

                return res.render('currency.pug', {
                    currency,
                });
            } catch (error) {
               return res.status(error.status).json({
                    error: error.message,
                });
            }
        }

        const currencies: Currency[] = CurrencyService.getAllInArray();

        return res.render('currencies.pug', {
            title: 'All currencies',
            currencies,
        });
    }

    /**
     * Add new currency
     *
     * @param req - request
     * @param res - response
     * @param next - next funciton
     */
    public static async add(req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response | void> {
        const currency = req.body.currency;

        try {
            const potentialCurrency = CurrencyService.getByTicker(currency.ticker);

            if (potentialCurrency) {
                return next(new HttpError(HttpStatusCode.BadRequest, `Currency with ticker ${potentialCurrency.ticker} already exists`))
            }

            const cur: Currency = await CurrencyService.add(currency);

            res.json({
               currency: cur,
            });
        } catch (error) {
            res.status(error.status).json({
                error: error.message,
            });
        }
    }

    /**
     * Delete currency by id
     *
     * @param req - request
     * @param res - response
     */
    public static delete(req: express.Request, res: express.Response) {
        try {
            const success = CurrencyService.remove(req.params.id);

            res.json({
                success,
            });
        } catch (error) {
            res.status(error.status).json({
                error: error.message,
            });
        }
    }

    /**
     * Update currency by id
     *
     * @param req - request
     * @param res - response
     * @param next - next function
     */
    public static update(req: express.Request, res: express.Response, next: express.NextFunction) {
        const currency = req.body.currency;
        const id = req.params.id;

        try {
            const oldCurrency: Currency | undefined = CurrencyService.getById(id);

            if (!oldCurrency) {
                return next(new HttpError(HttpStatusCode.NotFound, `Currency with id ${id} not found`));
            }

            if (oldCurrency.ticker !== currency.ticker) {
                const currencyWithSameTicker = CurrencyService.getByTicker(currency.ticker);

                if (currencyWithSameTicker) {
                    return next(new HttpError(HttpStatusCode.BadRequest, `Currency with ticker ${currency.ticker} already exists`))
                }
            }

            const updatedCurrency: Currency = CurrencyService.update(id, currency);

            res.json({
                currency: updatedCurrency,
            });
        } catch (error) {
            res.status(error.status).json({
                error: error.message,
            });
        }
    }

    /**
     * Render edit currency page
     *
     * @param req - request
     * @param res - response
     */
    public static edit(req: express.Request, res: express.Response) {
        try {
            const currencies = CurrencyService.getAllInArray();

            if (!currencies.length) {
                res.redirect('/');
            }

            res.render('edit', {
                currencies
            });
        } catch (error) {
            res.status(error.status).json({
                error: error.message,
            });
        }
    }
}