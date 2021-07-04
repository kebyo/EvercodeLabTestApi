import express, {Router} from 'express';

const router = Router();

/**
 * Main page (redirect to '/currency')
 */
router.get('/', (req: express.Request, res: express.Response) => {
    return res.redirect('/currency');
});

export default router;