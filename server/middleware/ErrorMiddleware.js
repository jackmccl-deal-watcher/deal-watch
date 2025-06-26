const ErrorMiddleware = (error, req, res, next) => {
    console.error(error)
    const message = error.message || 'Internal server error'
    const statusCode = error.statusCode || 500
    res.status(statusCode).json({
        status: 'error',
        message: message
    })
}

module.exports = { ErrorMiddleware }