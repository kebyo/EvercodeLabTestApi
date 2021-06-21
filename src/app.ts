import express from 'express';
import path from 'path';
import Env from './env';
import cors from './middlewares/cors';
import routeError from './middlewares/routeError';
import currency from './routes/currency';
import main from './routes/main';

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

        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'pug')

        this.app.use('/', main);

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