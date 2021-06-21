/**
 * Http error
 */
class HttpError extends Error {
    /**
     * HTTP status codes
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
     */
    public status: number;

    /**
     * Constructor
     *
     * @param status - status code
     * @param message - message
     */
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export default HttpError;

/**
 * HTTP status codes
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */
export enum HttpStatusCode {
    /**
     * The server can not do something. It can be route, entities.
     */
    NotFound = 404,

    /**
     * The server can not do something because user send bad request. It can be wrong data.
     */
    BadRequest = 400,

    /**
     * The server redirected to another route
     */
    Redirect = 3001,
}
