import express from 'express';

/**
 * CORS setup
 *
 * @param req - request
 * @param res - response
 * @param next - next function
 */
export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS'){
        res.header('Access-Control=Allow-Methods', 'GET, PATCH, POST');

        return res.json({});
    }

    next();
}
