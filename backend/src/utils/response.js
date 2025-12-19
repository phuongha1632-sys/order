exports.success = (res, data = null) => res.json({ status: 'success', data });
exports.error = (res, message = 'Error', code = 500) => res.status(code).json({ status: 'error', message });