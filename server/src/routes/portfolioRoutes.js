import { Router } from 'express';
import {
  getPortfolio,
  getProjects,
  submitContact
} from '../controllers/portfolioController.js';

const router = Router();

router.get('/portfolio', getPortfolio);
router.get('/projects', getProjects);
router.post('/contact', submitContact);

export default router;
