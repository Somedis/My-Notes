const express = require('express');
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.post('/api/users/register', async (req, res) => {
	const { email, login, password } = req.body;

	const body = JSON.stringify({
		email,
        login,
		password,
	});

	try {
		const apiRes = await fetch(`${process.env.API_URL}/api/users/register`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body,
		});

		const data = await apiRes.json();

		return res.status(apiRes.status).json(data);
	} catch (err) {
		return res.status(500).json({
			error: 'Something went wrong when registering account',
			password_error: '*password must contain at least 8 characters'
		});
	}
});

module.exports = router;