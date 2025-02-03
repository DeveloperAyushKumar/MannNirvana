import express from 'express';
import { createUser, getUser, editUser,incrementCoins, getTop10User} from './user.controller.js';

const router = express.Router();
// create user
router.route('/').post(createUser);
router.route('/edit/:id').put(editUser);
router.route("/reward/:id").put(incrementCoins)
router.route("/get-top").get(getTop10User);
router.route('/:id').get(getUser);

export default router;
