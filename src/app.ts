import express from 'express';
import path from 'path';
import cors from 'cors';
import Env from './env';
import routeError from './middlewares/routeError';
import currency from './routes/currency';
import main from './routes/main';
import sendError from './middlewares/sendError';

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
        this.app.use(cors());

        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'pug')

        this.app.use(express.static(path.join(__dirname, 'public')));

        this.app.use('/', main);
        this.app.use('/currency', currency);

        this.app.use(routeError);

        this.app.use(sendError);
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