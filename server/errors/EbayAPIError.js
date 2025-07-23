class EbayAPIError extends Error {
    constructor(message) {
        super(message)
        this.name = 'EbayAPIError'
    }
}

module.exports = { EbayAPIError }