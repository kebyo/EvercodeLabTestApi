import {Router} from 'express';
import CurrencyController from '../controllers/currency';
import currencyValidator from '../middlewares/validations/currencyRoute';


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
router.post('/', currencyValidator, CurrencyController.add);

/**
 * Route for deleting currency by id
 */
router.delete('/:id', CurrencyController.delete);

/**
 * Route for updating currency by id
 */
router.patch('/:id', currencyValidator, CurrencyController.update)

export default router;