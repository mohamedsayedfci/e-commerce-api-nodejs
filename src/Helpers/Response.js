exports.sendResponse = (res, result, message = 'success', code = 200) => {

    res.status(200).json({data: result, message: message, status: code});

};

exports.sendError = (res, message = 'success', code = 404) => {

    res.status(code).json({ message: message, status: code});

};
