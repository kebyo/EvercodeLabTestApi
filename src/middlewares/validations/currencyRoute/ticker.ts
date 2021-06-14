/**
 * Ticker validations
 *
 * @param ticker - ticker
 */
export default (ticker: string) => {
    const tickerRegExp: RegExp = /^[A-Za-z0-9]{3,5}$/;

    return tickerRegExp.test(ticker);
}
