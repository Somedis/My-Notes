const express = require('express');
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.post('/api/notes/', async (req, res) => {
    const content = req.body;
    const body = JSON.stringify(content);

    try {
		const apiRes = await fetch(`${process.env.API_URL}/api/notes/`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: body
		});

        const data = await apiRes.json();

		return res.status(apiRes.status).json(data);
	} catch (err) {
		return res.status(500).json({
			error: 'Something went wrong when trying to create note',
		});
    }
})

module.exports = router;