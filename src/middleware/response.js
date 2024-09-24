// Middleware to add custom response methods
const responseEnhancer = (req, res, next) => {
    res.sendResponse = (result = null, message = 'success', code = 200) => {
        res.status(code).json({
            data: result,
            message: message,
            status: code
        });
    };

    res.sendError = (message = 'An error occurred', code = 404, error = null) => {
        const response = {
            message: message,
            status: code,
        };

        if (error) {
            response.error = error;
        }

        res.status(code).json(response);
    };

    next();
};

module.exports = responseEnhancer;
