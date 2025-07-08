class PartEvaluationError extends Error {
    constructor(message) {
        super(message)
        this.name = 'PartEvaluationError'
        this.statusCode = 400
    }
}

module.exports = { PartEvaluationError }