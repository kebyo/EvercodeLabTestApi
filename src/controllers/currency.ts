import express from 'express';
import CurrencyService from '../services/currency';
import Currency from '../types/currency';

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
        const currencies: Currency[] = CurrencyService.getAllInArray();

        res.json({
            currencies,
        });
    }

    /**
     * Find currency by id
     *
     * @param req - request
     * @param res - response
     */
    public static findById(req: express.Request, res: express.Response) {
        const id: string = req.params.id;

        try {
            const currency: Currency = CurrencyService.getById(id);

            res.json({
                currency,
            })
        } catch (error) {
            res.status(error.status).json({
                error: error.message,
            });
        }
    }

    /**
     * Add new currency
     *
     * @param req - request
     * @param res - response
     */
    public static async add(req: express.Request, res: express.Response) {
        const currency = req.body.currency;

        try {
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
     */
    public static update(req: express.Request, res: express.Response) {
        const currency = req.body.currency;
        const id = req.params.id;

        try {
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
}