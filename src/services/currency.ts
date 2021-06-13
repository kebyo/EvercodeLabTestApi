import Currency from '../types/currency';
import {nanoid} from 'nanoid';
import {Storage} from '../types/storage';
import HttpError, {HttpStatusCode} from '../utils/httpError';

/**
 * Class for manage currencies in storage (it can be in database, but in my case I store data in RAM)
 */
export default class CurrencyService {
    /**
     * Storage
     */
    private static storage: Storage = new Map<string, Currency>();

    /**
     * Add currency in storage
     *
     * @param currency - currency
     * @throws HttpError - currency with his ticker already exists
     */
    public static async add(currency: Currency): Promise<Currency> {
        const potentialCur: Currency | undefined = this.getByTicker(currency.ticker);

        if (potentialCur) {
            throw new HttpError(HttpStatusCode.BadRequest, `Currency with ticker ${potentialCur.ticker} already exists`);
        }

        currency.id = await nanoid();

        this.storage.set(currency.id, currency);

        return this.getById(currency.id);
    }

    /**
     * Get all currencies as array
     */
    public static getAllInArray(): Array<Currency> {
        return Array.from(this.storage.values());
    }

    /**
     * Get currency by Id
     *
     * @param id - currency id
     * @throws HttpError - currency not found
     */
    public static getById(id: string): Currency {
        const currency: Currency | undefined = this.storage.get(id);

        if (!currency) {
            throw new HttpError(HttpStatusCode.NotFound, `Currency with id ${id} not found`);
        }

        return currency;
    }

    /**
     * Get currency by ticker
     *
     * @param ticker - currency ticker
     */
    private static getByTicker(ticker: string): Currency | undefined {
         return this.getAllInArray().find(c => c.ticker === ticker);
    }

    /**
     * Remove ticker by id
     *
     * @param id - ticker id
     * @throws HttpError - currency not found
     */
    public static remove(id: string): boolean {
        const currency = this.getById(id);

        return this.storage.delete(id);
    }

    /**
     * Update currency by id
     *
     * @param id - currency id
     * @param currency - updated currency
     * @throws HttpError - if updated currency have same ticker with other currency
     */
    public static update(id: string, currency: Currency): Currency {
        const curWithSameTicker = this.getAllInArray().find(c => c.ticker === currency.ticker);

        if (curWithSameTicker) {
            throw new HttpError(HttpStatusCode.BadRequest, `Currency with ticker ${curWithSameTicker.ticker} exists`);
        }

        return this.storage.set(id, currency).get(id)!;
    }
}