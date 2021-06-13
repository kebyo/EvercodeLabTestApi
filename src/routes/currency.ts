import {Router} from 'express';
import CurrencyController from '../controllers/currency';

const router = Router();

/**
 * Route for getting all currencies
 */
router.get('/', CurrencyController.findAll);

/**
 * Route for getting currency by id
 */
router.get('/:id', CurrencyController.findById);

/**
 * Route for adding new currency
 */
router.post('/', CurrencyController.add);

/**
 * Route for deleting currency by id
 */
router.delete('/:id', CurrencyController.delete);

/**
 * Route for updating currency by id
 */
router.patch('/:id', CurrencyController.update)

export default router;