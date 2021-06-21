import express, {Router} from 'express';
import {HttpStatusCode} from '../utils/httpError';

const router = Router();

/**
 * Main page (redirect to '/currency')
 */
router.get('/', (req: express.Request, res: express.Response) => {
    res.status(HttpStatusCode.Redirect).redirect('/currency');
});

export default router;