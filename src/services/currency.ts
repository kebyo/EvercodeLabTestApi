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
     */
    public static async add(currency: Currency): Promise<Currency> {
        currency.id = await nanoid();

        this.storage.set(currency.id, currency);

        return this.getById(currency.id)!;
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
     */
    public static getById(id: string): Currency | undefined {
        return this.storage.get(id);
    }

    /**
     * Get currency by ticker
     *
     * @param ticker - currency ticker
     */
    public static getByTicker(ticker: string): Currency | undefined {
         return this.getAllInArray().find(c => c.ticker === ticker);
    }

    /**
     * Get currencies by name
     *
     * @param name - currency name
     */
    public static getByName(name: string): Currency | undefined {
        return this.getAllInArray().find(c => c.name === name);
    }

    /**
     * Search currency by ticker or name
     *
     * @param filter - ticker or name
     */
    public static search(filter: string): Currency | undefined {
        return this.getAllInArray().find(c => c.ticker === filter || c.name === filter);
    }
    /**
     * Remove ticker by id
     *
     * @param id - ticker id
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
     */
    public static update(id: string, currency: Currency): Currency {
        currency.id = id;

        return this.storage.set(id, currency).get(id)!;
    }
}