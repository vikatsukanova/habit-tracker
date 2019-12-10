const express = require('express');
const router = express.Router();

const userService = require('./userService');
const tokenService = require('../../tokens/tokenService');

router.get('/', async (req, res, next) => {});
router.post('/', async (req, res, next) => {});


router.post('/login', async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await userService.loginUser(email, password);
		if (user) {
			const token = await tokenService.issueToken(user);
			res.status(200).json({ data: [{token}] });
		} else {
			res.status(401).json({data: []});
		}
	} catch (err) {
		next(err)
	}
});

module.exports.router = router;
