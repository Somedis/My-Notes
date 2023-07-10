const express = require('express');
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.get(`/api/notes/:pk/`, async (req, res) => {

    try {
		const apiRes = await fetch(`${process.env.API_URL}/api/notes/${req.params.pk}/`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});

		const data = await apiRes.json();

		console.log()

		return res.status(apiRes.status).json(data);
	} catch (err) {
		return res.status(500).json({
			error: 'Something went wrong when trying to get note',
		});
    }
});

module.exports = router;