const { APIError } = require('../errors/APIError');

const validateStringInput = (input, input_type) => {
    if (typeof input !== 'string' || !(input.trim())) {
        throw new APIError(`Invalid string input: ${input_type}`)
    }
}

const validateNumberInput = (input, input_type) => {
    if (typeof input !== 'number' || input <= 0) {
        throw new APIError(`Invalid number input: ${input_type}`)
    }
}

module.exports = { validateStringInput, validateNumberInput }