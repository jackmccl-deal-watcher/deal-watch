const { EbayAPIError } = require('../errors/EbayAPIError');

const validateStringInput = (input, input_type) => {
    if (typeof input !== 'string' || !(input.trim())) {
        throw new EbayAPIError(`Invalid string input: ${input_type}`)
    }
}

const validateNumberInput = (input, input_type) => {
    if (typeof input !== 'number' || input <= 0) {
        throw new EbayAPIError(`Invalid number input: ${input_type}`)
    }
}

module.exports = { validateStringInput, validateNumberInput }