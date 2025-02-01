import express from 'express';
import { createConsultant,getAllConsultants,getConsultant } from './Consultant.controller.js';
const router = express.Router();
router.route('/').get(getAllConsultants)
router.route('/:id').get(getConsultant)
router.route('/').post(createConsultant)
export default router;