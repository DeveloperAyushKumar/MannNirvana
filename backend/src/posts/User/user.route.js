import express from 'express';
import { createUser, getUser, editUser,incrementCoins} from './user.controller.js';

const router = express.Router();
// create user
router.route('/:id').get(getUser);
router.route('/').post(createUser);
router.route('/edit/:id').put(editUser);
router.route("/reward/:id").put(incrementCoins)

export default router;
