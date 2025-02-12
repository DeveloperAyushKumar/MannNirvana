import express from 'express';
import { verifyToken } from '../../../utils/token.js';
import { 
    createUser, 
    getUser, 
    editUser, 
    incrementCoins, 
    getTop10User 
} from './user.controller.js';

const router = express.Router();

// Public Routes (No Authentication Required)
router.get('/get-top', verifyToken, getTop10User);     // Get top 10 users
router.get('/:id', getUser);  // Get user by ID
router.post('/', createUser); // Create user

// Protected Routes (Require Authentication)
router.put('/edit/:id', verifyToken, editUser);       // Edit user
router.put('/reward/:id', verifyToken, incrementCoins); // Reward system

export default router;
