import posts from './_posts.js';
import * as fs from 'fs';

let text = fs.promises.readFile('test.txt', 'utf8');

const lookup = new Map();
posts.forEach(post => {
	lookup.set(post.slug, post);
});

export async function get(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;

	if (lookup.has(slug)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		const data = lookup.get(slug)
		data.text = await text;

		res.end(JSON.stringify(data));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}
