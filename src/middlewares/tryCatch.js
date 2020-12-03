const tryCatchMiddleware = (cb) => {
	return async (req, res, next) => {
		try {
			await cb(req, res, next);
		} catch (e) {
			console.log(e);
			res.status(e.statusCode || 500).end();
		}
	};
};

module.exports = tryCatchMiddleware;
