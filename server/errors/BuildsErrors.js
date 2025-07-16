class BuildSaveError extends Error {
    constructor(message) {
        super(message)
        this.name = 'BuildSaveError'
        this.statusCode = 422
    }
}

module.exports = { BuildSaveError }