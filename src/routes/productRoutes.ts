import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
} from '../controllers/productController';
import { authenticate } from '../middleware/authMiddleware';
import { authorize } from '../middleware/roleMiddleware';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/category/:category', getProductsByCategory);

// Rutas protegidas
router.post('/', authenticate, authorize(['admin']), createProduct);
router.put('/:id', authenticate, authorize(['admin']), updateProduct);
router.delete('/:id', authenticate, authorize(['admin']), deleteProduct);

export default router;