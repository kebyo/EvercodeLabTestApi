import express from 'express';
import Env from './env';
import cors from './middlewares/cors';
import routeError from './middlewares/routeError';
import currency from './routes/currency';

/**
 * EvercodeLab Test task API
 */
export default class EvercodeLabTestApi {
    /**
     * Express.js application
     */
    private app: express.Application = express();

    /**
     * Host
     */
    private host: string = Env.host;

    /**
     * Port
     */
    private port: number = Env.port;

    /**
     * Constructor
     */
    public constructor() {
        this.app.use(express.json());
        this.app.use(cors);

        this.app.use('/currency', currency);

        this.app.use(routeError);
    }

    /**
     * Run API
     */
    public run() {
        this.app.listen(this.port, this.host, () => {
            console.log(`⚡️[server]: Server is running at http://${this.host}:${this.port}`)
        });
    }

};