const express = require('express');
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.get('/api/notes/', async (req, res) => {
	const query = req.query.pk

    try {
		const apiRes = await fetch(`${process.env.API_URL}/api/notes/?pk=${query}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});

		const data = await apiRes.json();

		return res.status(apiRes.status).json(data);
	} catch (err) {
		return res.status(500).json({
			error: 'Something went wrong when trying to get notes',
		});
    }
});

module.exports = router;