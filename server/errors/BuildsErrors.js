class BuildSaveError extends Error {
    constructor(message) {
        super(message)
        this.name = 'BuildSaveError'
        this.statusCode = 400
    }
}

module.exports = { BuildSaveError }